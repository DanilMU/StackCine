import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Account } from '@prisma/generated/client';
import { RpcStatus } from '@stackcine/common';
import type {
	SendOtpRequest,
	VerifyOtpRequest,
} from '@stackcine/contracts/gen/auth';
import { PassportService } from '@stackcine/passport';

import { OtpService } from '../otp/otp.service';

import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
	public constructor(
		private readonly authRepository: AuthRepository,
		private readonly otpService: OtpService,
		private readonly passportService: PassportService,
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

	public async verifyOtp(data: VerifyOtpRequest) {
		const { identifier, code, type } = data;

		await this.otpService.verify(
			identifier,
			code,
			type as 'phone' | 'email',
		);

		let account: Account | null;

		if (type === 'phone')
			account = await this.authRepository.findByPhone(identifier);
		else account = await this.authRepository.findByEmail(identifier);

		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'Account not found',
			});

		if (type === 'phone' && !account.isPhoneVerified)
			await this.authRepository.update(account.id, {
				isPhoneVerified: true,
			});

		if (type === 'email' && !account.isEmailVerified)
			await this.authRepository.update(account.id, {
				isEmailVerified: true,
			});

		console.log(
			'VERIFY RESULT: ',
			this.passportService.verify(
				'am8yZ0lpX0tKaXpDRllaZDBCZG16.MTc3MTc3MTg3Nw.MTc3MTc3Mjc3Nw.0b9b83410b363bc77d8f10c5cb735ce7f25acc66a4a74abfe43ea128e4f346d8',
			),
		);

		return {
			access_token: this.passportService.generate(account.id, 900),
			refresh_token: '123456',
		};
	}
}
