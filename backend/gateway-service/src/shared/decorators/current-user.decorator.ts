import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = (): ParameterDecorator =>
	createParamDecorator((_: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();

		return request.user.id ?? null;
	});
