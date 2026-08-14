import { Controller, UseInterceptors } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import type {
	EmailChangedEvent,
	OtpRequestedEvent,
	PhoneChangedEvent,
} from '@stackcine/contracts';
import { RmqMetricsInterceptor } from 'src/observability/metrics/rmq-metrics.interceptor';

import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
	public constructor(
		private readonly notificationsService: NotificationsService,
	) {}

	@EventPattern('auth.otp.requested')
	@UseInterceptors(RmqMetricsInterceptor)
	public async otpRequested(@Payload() data: OtpRequestedEvent) {
		return this.notificationsService.sendOtp(data);
	}

	@EventPattern('account.phone.changed')
	@UseInterceptors(RmqMetricsInterceptor)
	public async phoneChanged(@Payload() data: PhoneChangedEvent) {
		return this.notificationsService.sendPhoneChange(data);
	}

	@EventPattern('account.email.changed')
	@UseInterceptors(RmqMetricsInterceptor)
	public async emailChanged(@Payload() data: EmailChangedEvent) {
		return this.notificationsService.sendEmailChange(data);
	}
}
