import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type {
	SendOtpRequest,
	SendOtpResponse,
	VerifyOtpRequest,
	VerifyOtpResponse,
} from '@stackcine/contracts/gen/auth';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	@GrpcMethod('AuthService', 'SendOtp')
	public async sendOtp(data: SendOtpRequest): Promise<SendOtpResponse> {
		return await this.authService.sendOtp(data);
	}

	@GrpcMethod('AuthService', 'VerifyOtp')
	public async verifyOtp(
		data: VerifyOtpRequest,
	): Promise<VerifyOtpResponse> {
		const result = await this.authService.verifyOtp(data);
		return {
			accessToken: result.accessToken,
			refreshToken: result.refreshToken,
		};
	}
}
