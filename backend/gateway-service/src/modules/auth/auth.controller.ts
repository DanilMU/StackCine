import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';
import type { Response } from 'express';
import { map, Observable } from 'rxjs';

import { AuthClientGrpc } from './auth.grpc';
import { SendOtpRequest, VerifyOtpRequest } from './dto';

@Controller('auth')
export class AuthController {
	public constructor(
		private readonly client: AuthClientGrpc,
		private readonly configService: ConfigService,
	) {}

	@ApiOperation({
		summary: 'Verify OTP code',
		description: 'Send OTP code to the user email or phone number',
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public sendOtp(@Body() dto: SendOtpRequest) {
		return this.client.sendOtp(dto);
	}

	@ApiOperation({
		summary: 'Verify OTP code',
		description:
			'Verifies the code sent to user phone number or email and returns an access token.',
	})
	@Post('otp/verify')
	@HttpCode(HttpStatus.OK)
	public verifyOtp(
		@Body() dto: VerifyOtpRequest,
		@Res({ passthrough: true }) res: Response,
	): Observable<{ accessToken: string }> {
		return this.client.verifyOtp(dto).pipe(
			map(({ accessToken, refreshToken }) => {
				res.cookie('refreshToken', refreshToken, {
					httpOnly: true,
					secure:
						this.configService.get('NODE_ENV') !==
						'development',
					domain: this.configService.getOrThrow<string>(
						'COOKIES_DOMAIN',
					),
					sameSite: 'lax',
					maxAge: 30 * 24 * 60 * 60 * 1000,
				});

				return { accessToken };
			}),
		);
	}
}
