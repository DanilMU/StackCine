import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Account } from '@prisma/generated/client';
import { RpcStatus } from '@stackcine/common';
import type {
	RefreshRequest,
	SendOtpRequest,
	VerifyOtpRequest,
} from '@stackcine/contracts/gen/auth';

import { MessagingService } from '@/infrastructure/messaging/messaging.service';
import { UserRepository } from '@/shared/repositories';

import { OtpService } from '../otp/otp.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
	public constructor(
		private readonly userRepository: UserRepository,
		private readonly otpService: OtpService,
		private readonly tokenService: TokenService,
		private readonly messagingService: MessagingService,
	) {}

	public async sendOtp(data: SendOtpRequest) {
		const { identifier, type } = data;

		let account: Account | null;

		if (type === 'phone')
			account = await this.userRepository.findByPhone(identifier);
		else account = await this.userRepository.findByEmail(identifier);

		if (!account) {
			account = await this.userRepository.create({
				phone: type === 'phone' ? identifier : undefined,
				email: type === 'email' ? identifier : undefined,
			});
		}

		const { code } = await this.otpService.send(
			identifier,
			type as 'phone' | 'email',
		);

		await this.messagingService.otpRequested({
			identifier,
			type,
			code,
		});

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
			account = await this.userRepository.findByPhone(identifier);
		else account = await this.userRepository.findByEmail(identifier);

		if (!account)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'Account not found',
			});

		console.log('AuthService: Found account:', account);
		console.log('AuthService: Account ID:', account.id);

		if (type === 'phone' && !account.isPhoneVerified)
			await this.userRepository.update(account.id, {
				isPhoneVerified: true,
			});

		if (type === 'email' && !account.isEmailVerified)
			await this.userRepository.update(account.id, {
				isEmailVerified: true,
			});

		console.log(
			'AuthService: Generating tokens for account ID:',
			account.id,
		);

		return this.tokenService.generate(account.id);
	}

	public async refresh(data: RefreshRequest) {
		const { refreshToken } = data;

		const result = this.tokenService.verify(refreshToken);

		if (!result.valid) {
			throw new RpcException({
				code: RpcStatus.UNAUTHENTICATED,
				details: result.reason,
			});
		}

		return this.tokenService.generate(result.userId);
	}
}
