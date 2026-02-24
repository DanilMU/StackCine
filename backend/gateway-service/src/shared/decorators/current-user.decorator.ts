import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = (): ParameterDecorator =>
	createParamDecorator((_: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();

		console.log('CurrentUser decorator: request.user =', request.user);

		if (!request.user) return null;

		const userId = request.user.id ?? null;

		console.log('CurrentUser decorator: returning userId =', userId);

		return userId;
	});
