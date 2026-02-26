import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class ConfirmEmailChangeRequest {
	@ApiProperty({
		example: 'vito.cornleone@stack-forge.ru',
	})
	@IsNotEmpty()
	@IsEmail()
	public email!: string;

	@ApiProperty({
		example: '123456',
		description: 'The OTP code sent to the user',
	})
	@IsNotEmpty()
	@IsNumberString()
	@Length(6, 6)
	public code!: string;
}
