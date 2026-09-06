import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcStatus } from '@stackcine/common';
import {
	CreateRefundRequest,
	ProcessRefundEventRequest,
} from '@stackcine/contracts/gen/ts/refund';
import { YookassaService } from 'nestjs-yookassa';
import { lastValueFrom } from 'rxjs';

import { BookingClientGrpc } from '@/clients/booking.client';

import { RefundRepository } from './refund.repository';

@Injectable()
export class RefundService {
	public constructor(
		private readonly repository: RefundRepository,
		private readonly yookassaService: YookassaService,
		private readonly bookingClient: BookingClientGrpc,
	) {}

	public async createRefund(data: CreateRefundRequest) {
		const { userId, bookingId } = data;

		const payment =
			await this.repository.findPaymentByBookingId(bookingId);

		if (!payment || payment.userId !== userId)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'Payment not found',
			});

		const refund = await this.repository.createRefund({
			amount: payment.amount,
			payment: {
				connect: {
					id: payment.id,
				},
			},
		});

		let yookassa: any;
		try {
			yookassa = await this.yookassaService.refunds.create({
				payment_id: payment.providerId!,
				amount: {
					value: payment.amount.toFixed(2),
					currency: 'RUB',
				},
			} as any);
		} catch (error: any) {
			throw new RpcException({
				code: RpcStatus.INTERNAL,
				details:
					error?.message ??
					'Failed to create refund in YooKassa',
			});
		}

		await this.repository.updateRefund(refund.id, {
			providerId: yookassa.id,
		});

		return { ok: true };
	}

	public async processEvent(data: ProcessRefundEventRequest) {
		const { event, providerRefundId, status } = data;

		const refund =
			await this.repository.findRefundByProviderId(
				providerRefundId,
			);

		if (!refund)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'Refund not found',
			});

		if (event === 'refund.succeeded') {
			try {
				await this.repository.markRefundSuccess(refund.id);
				await this.repository.markPaymentRefunded(
					refund.paymentId,
				);

				await lastValueFrom(
					this.bookingClient.cancelBooking({
						bookingId: refund.payment.bookingId,
						userId: refund.payment.userId,
					}),
				);

				return { ok: true };
			} catch (error) {
				throw new RpcException({
					code: RpcStatus.INTERNAL,
					details: 'Failed to process refund',
				});
			}
		}
	}
}
