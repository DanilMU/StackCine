import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'

import { SendOtpRequest } from './dto'
import { ApiOperation } from '@nestjs/swagger'
import { AuthClientGrpc } from './auth.grpc'

@Controller('auth')
export class AuthController {
	public constructor(private readonly client: AuthClientGrpc) {}

	@ApiOperation({
		summary: 'Send OTP code',
		description: 'Send OTP code to the user email or phone number',
	})
	@Post('otp/send')
	@HttpCode(HttpStatus.OK)
	public sendOtp(@Body() dto: SendOtpRequest) {
		return this.client.sendOtp(dto)
	}
}
