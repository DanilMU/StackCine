import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AuthClientGrpc } from './auth.grpc';
import { SendOtpRequest, VerifyOtpRequest } from './dto';

@Controller('auth')
export class AuthController {
	public constructor(private readonly client: AuthClientGrpc) {}

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
	public verifyOtp(@Body() dto: VerifyOtpRequest) {
		return this.client.verifyOtp(dto);
	}
}
