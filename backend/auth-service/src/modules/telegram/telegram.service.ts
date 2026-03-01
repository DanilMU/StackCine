import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AllConfigs } from '@/config';

@Injectable()
export class TelegramService {
	private readonly BOT_ID: string;
	private readonly BOT_TOKEN: string;
	private readonly BOT_USERNAME: string;
	private readonly REDIRECT_ORIGIN: string;

	public constructor(
		private readonly configService: ConfigService<AllConfigs>,
	) {
		this.BOT_ID = this.configService.get('telegram.botId', {
			infer: true,
		});

		this.BOT_TOKEN = this.configService.get('telegram.botToken', {
			infer: true,
		});

		this.BOT_USERNAME = this.configService.get('telegram.botUsername', {
			infer: true,
		});

		this.REDIRECT_ORIGIN = this.configService.get(
			'telegram.redirectOrigin',
			{
				infer: true,
			},
		);
	}

	public getAuthUrl() {
		const url = new URL('https://oauth.telegram.org/auth');

		url.searchParams.append('bot_id', this.BOT_ID);
		url.searchParams.append('origin', this.REDIRECT_ORIGIN);
		url.searchParams.append('request_access', 'write');
		url.searchParams.append('return_to', this.REDIRECT_ORIGIN);

		return { url: url.href };
	}
}
