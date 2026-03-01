import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TelegramFinalizeRequest {
	@ApiProperty({
		example: '97270904278033ce62370d83c7fe5823',
	})
	@IsString()
	@IsNotEmpty()
	public sessionId!: string;
}
