import { ApiProperty } from '@nestjs/swagger';
import {
	IsEnum,
	IsNotEmpty,
	IsNumberString,
	IsString,
	Length,
	Validate,
} from 'class-validator';
import { IdentifierValidator } from 'src/shared/validators';

export class VerifyOtpRequest {
	@ApiProperty({
		example: '+79998887766',
		description: 'User email or phone number',
	})
	@IsString()
	@Validate(IdentifierValidator)
	public identifier!: string;

	@ApiProperty({
		example: '123456',
		description: 'The OTP code sent to the user',
	})
	@IsNotEmpty()
	@IsNumberString()
	@Length(6, 6)
	public code!: string;

	@ApiProperty({
		example: 'phone',
		enum: ['phone', 'email'],
	})
	@IsEnum(['phone', 'email'])
	public type!: 'phone' | 'email';
}
