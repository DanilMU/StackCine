import {
	TelegramCompleteRequest,
	TelegramCompleteResponse,
} from '@stackcine/contracts/gen/auth';
import type { Telegraf } from 'telegraf';

import { authClient } from '@/infrastructure/grpc/auth.client';
import type { TelegrafContext } from '@/shared/interfaces';
import { callUnary } from '@/shared/utils';

export function registerContactHandler(bot: Telegraf<TelegrafContext>) {
	bot.on('contact', async (ctx) => {
		const phone = ctx.message.contact.phone_number;

		if (!ctx.chat.id || !ctx.session.id)
			return ctx.reply(
				'Произошла ошибка. Пожалуйста, начните процесс через сайт.',
			);

		const request: TelegramCompleteRequest = {
			sessionId: ctx.session.id,
			phone,
		};

		const { sessionId } = await callUnary<TelegramCompleteResponse>(
			authClient.telegramComplete.bind(authClient),
			request,
		);

		await ctx.reply('Регистрация успешна завершена!', {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'Вернуться на сайт',
							url: `https://stackcine.ru/auth/tg-finalize?sessionId=${sessionId}`,
						},
					],
				],
				remove_keyboard: true,
			},
		});
	});
}
