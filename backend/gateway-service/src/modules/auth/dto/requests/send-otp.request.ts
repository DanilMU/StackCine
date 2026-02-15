import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsString, Validate } from "class-validator"
import { IdentifierValidator } from "src/shared/validators"

export class SendOtpRequest {
	@ApiProperty({
		example: '+79998887766',
		description: 'User email or phone number',
	})
	@IsString()
	@Validate(IdentifierValidator)
	public identifier!: string

	@ApiProperty({
		example: 'phone',
		enum: ['phone', 'email'],
	})
	@IsEnum(['phone', 'email'])
	public type!: 'phone' | 'email'
}
