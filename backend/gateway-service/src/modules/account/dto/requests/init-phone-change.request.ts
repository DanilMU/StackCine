import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class InitPhoneChangeRequest {
	@ApiProperty({
		example: '+79998887766',
	})
	@IsNotEmpty()
	@Matches(/^\+?\d{10,15}$/)
	public phone!: string;
}
