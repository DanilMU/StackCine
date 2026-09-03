import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { PaymentClientGrpc } from '../payment/payment.grpc';

@Controller('webhook')
export class WebhookController {
	public constructor(private readonly paymentClient: PaymentClientGrpc) {}

	@Post('yookassa')
	@HttpCode(HttpStatus.OK)
	public async handleYookassa(@Body() raw: any) {
		const event = raw?.event;
		const data = raw?.object;

		const card = data?.payment_method?.card;

		if (event.startsWith('payment.')) {
			await this.paymentClient.call('processPaymentEvent', {
				event,
				paymentId: data.metadata.payment_id,
				bookingId: data.metadata.booking_id ?? '',
				userId: data.metadata.user_id,
				savePaymentMethod: data.payment_method?.saved,
				providerMethodId: data.payment_method?.id,
				cardFirst6: card?.first6,
				cardLast4: card?.last4,
			});
		}
	}
}
