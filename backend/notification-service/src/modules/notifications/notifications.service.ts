import { Injectable } from '@nestjs/common';
import type {
	EmailChangedEvent,
	OtpRequestedEvent,
	PhoneChangedEvent,
} from '@stackcine/contracts';
import { MailService } from 'src/infrastructure/mail/mail.service';
import { SmsService } from 'src/infrastructure/sms/sms.service';

@Injectable()
export class NotificationsService {
	public constructor(
		private readonly mailService: MailService,
		private readonly smsService: SmsService,
	) {}

	public async sendOtp(data: OtpRequestedEvent) {
		const { identifier, code, type } = data;

		if (type === 'email')
			await this.mailService.sendOtp(identifier, code);
		else {
			await this.smsService.sendOtp(identifier, code);
		}
	}

	public async sendPhoneChange(data: PhoneChangedEvent) {
		const { phone, code } = data;

		await this.smsService.sendOtp(phone, code);
	}

	public async sendEmailChange(data: EmailChangedEvent) {
		const { email, code } = data;

		await this.mailService.sendEmailChange(email, code);
	}
}
