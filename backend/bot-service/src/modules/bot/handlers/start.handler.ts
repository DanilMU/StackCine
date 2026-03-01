import { Markup, Telegraf } from 'telegraf';

import { type TelegrafContext } from '@/shared/interfaces';

export function registerStartHandler(bot: Telegraf<TelegrafContext>) {
	bot.start(async (ctx) => {
		const sessionId = ctx.startPayload;

		if (!sessionId) {
			return ctx.reply(
				'Здравствуйте! Чтобы продолжить, пожалуйста, авторизируйтесь на сайте.',
				Markup.inlineKeyboard([
					Markup.button.url(
						'Перейти к авторизации',
						'https://stackcine.ru/auth/login',
					),
				]),
			);
		}

		ctx.session.id = sessionId;

		await ctx.reply(
			'Для завершения регистрации отправьте свой номер телефона',
			Markup.keyboard([
				[
					Markup.button.contactRequest(
						'Поделиться номером телефона',
					),
				],
			]),
		);
	});
}
