import { Injectable } from '@nestjs/common';
import { Account } from '@prisma/generated/client';
import type { SendOtpRequest } from '@stackcine/contracts/gen/auth';

import { OtpService } from '../otp/otp.service';

import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
	public constructor(
		private readonly authRepository: AuthRepository,
		private readonly otpService: OtpService,
	) {}

	public async sendOtp(data: SendOtpRequest) {
		const { identifier, type } = data;

		let account: Account | null;

		if (type === 'phone')
			account = await this.authRepository.findByPhone(identifier);
		else account = await this.authRepository.findByEmail(identifier);

		if (!account) {
			account = await this.authRepository.create({
				phone: type === 'phone' ? identifier : undefined,
				email: type === 'email' ? identifier : undefined,
			});
		}

		const code = await this.otpService.send(
			identifier,
			type as 'phone' | 'email',
		);

		console.debug('CODE: ', code);

		return { ok: true };
	}
}
