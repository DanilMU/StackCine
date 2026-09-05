import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRefundRequest {
	@ApiProperty({
		example: '',
		description: '',
	})
	@IsString()
	@IsNotEmpty()
	public bookingId!: string;
}
