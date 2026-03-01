import { session, Telegraf } from 'telegraf';

import { CONFIG } from '@/config';
import type { Session, TelegrafContext } from '@/shared/interfaces';

import { registerBotHandlers } from './handlers';

export function createBot() {
	const bot = new Telegraf<TelegrafContext>(CONFIG.BOT_TOKEN);

	bot.use(
		session({
			defaultSession: (): Session => ({
				id: undefined,
			}),
		}),
	);

	registerBotHandlers(bot);

	return bot;
}
