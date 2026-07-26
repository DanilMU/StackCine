import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length, Matches } from 'class-validator';

export class ConfirmPhoneChangeRequest {
	@ApiProperty({
		example: '+79998887766',
	})
	@IsNotEmpty()
	@Matches(/^\+?\d{10,15}$/)
	public phone!: string;

	@ApiProperty({
		example: '123456',
		description: 'The OTP code sent to the user',
	})
	@IsNotEmpty()
	@IsNumberString()
	@Length(6, 6)
	public code!: string;
}
