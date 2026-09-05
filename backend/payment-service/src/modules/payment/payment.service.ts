import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { PaymentMethod, PaymentMethodStatus } from '@prisma/generated/client';
import { RpcStatus } from '@stackcine/common';
import type {
	CreatePaymentMethodRequest,
	CreatePaymentRequest,
	DeletePaymentMethodRequest,
	GetUserPaymentMethodsRequest,
	ProcessPaymentEventRequest,
	VerifyPaymentMethodRequest,
} from '@stackcine/contracts/gen/ts/payment';
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

		const bookingId = (data as any).bookingId ?? '123456';

		const transaction = await this.repository.createPayment({
			amount: totalAmount,
			userId,
			bookingId,
		});

		let paymentMethod: PaymentMethod | null = null;

		if (paymentMethodId) {
			paymentMethod =
				await this.repository.findPaymentsMethodById(
					paymentMethodId,
				);

			if (!paymentMethod)
				throw new RpcException({
					code: RpcStatus.NOT_FOUND,
					details: 'Saved payment method not found',
				});
		}

		const payment = await this.yookassaService.payments.create({
			amount: {
				value: transaction.amount,
				currency: CurrencyEnum.RUB,
			},
			description: `Оплата билетов на сеанс ${screeningId}`,
			...(paymentMethodId
				? { payment_method_id: paymentMethod?.providerId! }
				: {
						payment_method_data: {
							type: PaymentMethodsEnum.BANK_CARD,
						},
						save_payment_method: !!savePaymentMethod,
					}),
			confirmation: {
				type: ConfirmationEnum.REDIRECT,
				return_url: `${this.HOSTS_APP}/account/tickets`,
			},
			metadata: {
				payment_id: transaction.id,
				booking_id: bookingId,
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

	public async processEvent(data: ProcessPaymentEventRequest) {
		const {
			paymentId,
			bookingId,
			userId,
			event,
			savePaymentMethod,
			providerMethodId,
			cardFirst6,
			cardLast4,
		} = data;

		const payment = await this.repository.findPaymentById(paymentId);

		if (!payment)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Payment not found',
			});

		if (event === 'payment.waiting_for_capture') {
			try {
				await this.yookassaService.payments.capture(
					payment.providerId!,
				);
			} catch (error) {
				throw new RpcException({
					code: RpcStatus.INTERNAL,
					details: 'Failed to capture payment',
				});
			}
		}

		if (event === 'payment.succeeded') {
			await this.repository.markPaymentSuccess(payment.id);

			if (savePaymentMethod && providerMethodId) {
				const existing =
					await this.repository.findActivePaymentMethod(
						userId,
						providerMethodId,
					);

				if (!existing) {
					try {
						await this.repository.createPaymentMethod({
							type: 'BANK_CARD',
							providerId: providerMethodId,
							userId,
							status: PaymentMethodStatus.ACTIVE,
							first6: cardFirst6,
							last4: cardLast4,
						});
					} catch (error) {
						console.error(
							`Failed to save payment method for user ${userId}: `,
							error,
						);
					}
				}
			}
		}

		if (event === 'payment.canceled') {
			await this.repository.markPaymentFailed(payment.id);
		}

		return { ok: true };
	}

	public async getUserPaymentMethods(data: GetUserPaymentMethodsRequest) {
		const { userId } = data;

		const methods =
			await this.repository.findUserPaymentMethods(userId);

		return { methods };
	}

	public async createPaymentMethod(data: CreatePaymentMethodRequest) {
		const { userId } = data;

		const method = await this.repository.createPaymentMethod({
			type: 'BANK_CARD',
			userId,
		});

		const yookassa = await this.yookassaService.paymentMethods.create({
			confirmation: {
				type: ConfirmationEnum.REDIRECT,
				return_url: `${this.HOSTS_APP}/account/payment-methods/callback?payment_method_id=${method.id}`,
			},
			type: PaymentMethodsEnum.BANK_CARD,
		});

		await this.repository.updatePaymentMethod(method.id, {
			providerId: yookassa.id,
		});

		return {
			userId,
			url: yookassa.confirmation?.confirmation_url,
		};
	}

	public async verifyPaymentMethod(data: VerifyPaymentMethodRequest) {
		const { methodId, userId } = data;

		const method =
			await this.repository.findPaymentsMethodById(methodId);

		if (!method || method.userId !== userId)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Payment method not found',
			});

		const yookassa = await this.yookassaService.paymentMethods.getById(
			method.providerId!,
		);

		if (!yookassa || yookassa.status !== 'active')
			throw new RpcException({
				code: RpcStatus.FAILED_PRECONDITION,
				details: 'Payment method is not active or was not saved',
			});

		await this.repository.updatePaymentMethod(method.id, {
			status: PaymentMethodStatus.ACTIVE,
			first6: yookassa.card?.first6,
			last4: yookassa.card?.last4,
			bank: yookassa.card?.card_product?.name ?? 'Unknown',
			brand: yookassa.card?.card_type,
		});

		return { ok: true };
	}

	public async deletePaymentMethod(data: DeletePaymentMethodRequest) {
		const { methodId, userId } = data;

		const method =
			await this.repository.findPaymentsMethodById(methodId);

		if (!method || method.userId !== userId)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Payment method not found',
			});

		await this.repository.deletePaymentMethod(method.id);

		return { ok: true };
	}
}
