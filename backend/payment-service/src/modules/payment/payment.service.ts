import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CreatePaymentRequest } from '@stackcine/contracts/gen/ts/payment';
import {
	ConfirmationEnum,
	CurrencyEnum,
	PaymentMethodsEnum,
	YookassaService,
} from 'nestjs-yookassa';

import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
	private readonly HOSTS_APP: string;

	public constructor(
		private readonly repository: PaymentRepository,
		private readonly configService: ConfigService,
		private readonly yookassaService: YookassaService,
	) {
		this.HOSTS_APP = this.configService.getOrThrow<string>('HOSTS_APP');
	}

	public async createPayment(data: CreatePaymentRequest) {
		const {
			userId,
			screeningId,
			seats,
			paymentMethodId,
			savePaymentMethod,
		} = data;

		const totalAmount = seats?.length
			? seats.reduce((acc, s) => acc + s.price, 0)
			: 1000;

		const transaction = await this.repository.createPayment({
			amount: totalAmount,
			userId,
		});

		const payment = await this.yookassaService.payments.create({
			amount: {
				value: transaction.amount,
				currency: CurrencyEnum.RUB,
			},
			description: `Оплата билетов на сеанс ${screeningId}`,
			payment_method_data: {
				type: PaymentMethodsEnum.BANK_CARD,
			},
			save_payment_method: !!savePaymentMethod,
			confirmation: {
				type: ConfirmationEnum.REDIRECT,
				return_url: `${this.HOSTS_APP}/account/tickets`,
			},
			metadata: {
				payment_id: transaction.id,
				user_id: userId,
			},
		});

		await this.repository.updatePayment(transaction.id, {
			providerId: payment.id,
			metadata: JSON.stringify(payment),
		});

		return {
			url:
				payment.confirmation &&
				'confirmation_url' in payment.confirmation
					? payment.confirmation.confirmation_url
					: `${this.HOSTS_APP}/account/tickets/callback`,
		};
	}
}
