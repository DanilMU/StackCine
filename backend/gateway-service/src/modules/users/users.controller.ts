import { Body, Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CurrentUser, Protected } from 'src/shared/decorators';

import { UsersClientGrpc } from './users.grpc';

@Controller('users')
export class UsersController {
	public constructor(private readonly client: UsersClientGrpc) {}

	@ApiOperation({
		summary: 'Get current user profile',
		description:
			'Retrieves the profile information of the currently authenticated user',
	})
	@ApiBearerAuth()
	@Protected()
	@Get('@me')
	@HttpCode(HttpStatus.OK)
	public async getMe(@CurrentUser() userId: string) {
		return this.client.getMe({
			id: userId,
		});
	}
}
