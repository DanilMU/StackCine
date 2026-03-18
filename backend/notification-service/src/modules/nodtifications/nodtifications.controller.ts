import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import type { OtpRequestedEvent } from '@stackcine/contracts';
import { RmqService } from 'src/infrastructure/rmq/rmq.service';

import { NodtificationsService } from './nodtifications.service';

@Controller()
export class NodtificationsController {
	public constructor(
		private readonly nodtificationsService: NodtificationsService,
		private readonly rmqService: RmqService,
	) {}

	@EventPattern('auth.otp.requested')
	public async otpRequested(
		@Payload() data: OtpRequestedEvent,
		@Ctx() ctx: RmqContext,
	) {
		try {
			await this.nodtificationsService.sendOtp(data);

			this.rmqService.ack(ctx);
		} catch (error) {
			console.log('OTP processing error: ', error.message ?? error);

			this.rmqService.nack(ctx, false);
		}
	}
}
