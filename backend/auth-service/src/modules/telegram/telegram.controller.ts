import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type { TelegramInitResponse } from '@stackcine/contracts/gen/auth';

import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
	public constructor(private readonly telegramService: TelegramService) {}

	@GrpcMethod('AuthService', 'TelegramInit')
	public async getAuthUrl(): Promise<TelegramInitResponse> {
		return this.telegramService.getAuthUrl();
	}
}
