import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TelegramVerifyRequest {
	@ApiProperty({
		example: 'xrcdvtfbyguhnijmokpl435r6t7by8nu9mec5rv6tb7yn8u...',
	})
	@IsString()
	@IsNotEmpty()
	public tgAuthResult!: string;
}
