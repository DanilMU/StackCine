import { Injectable } from '@nestjs/common';
import type { OtpRequestedEvent } from '@stackcine/contracts';
import { MailService } from 'src/infrastructure/mail/mail.service';

@Injectable()
export class NodtificationsService {
	public constructor(private readonly mailService: MailService) {}

	public async sendOtp(data: OtpRequestedEvent) {
		const { identifier, code, type } = data;

		if (type === 'email')
			await this.mailService.sendOtp(identifier, code);
		else console.log('SMS');
	}
}
