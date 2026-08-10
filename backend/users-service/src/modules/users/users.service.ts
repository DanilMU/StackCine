import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcStatus } from '@stackcine/common';
import type {
	CreateUserRequest,
	GetMeRequest,
	PatchUserRequest,
} from '@stackcine/contracts/gen/users';
import { lastValueFrom } from 'rxjs';
import { AccountClientGrpc } from 'src/infrastructure/grpc/clients/account.client';

import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
	public constructor(
		private readonly usersRepository: UsersRepository,
		private readonly accountClient: AccountClientGrpc,
	) {}

	public async getMe(data: GetMeRequest) {
		const { id } = data;

		const profile = await this.usersRepository.findById(id);

		if (!profile)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'User not found',
			});

		const account = await lastValueFrom(
			this.accountClient.getAccount({ id }),
		);

		return {
			user: {
				id: profile.id,
				name: profile.name ?? undefined,
				avatar: profile.avatar ?? undefined,
				phone: account.phone,
				email: account.email,
			},
		};
	}

	public async create(data: CreateUserRequest) {
		const { id } = data;

		await this.usersRepository.create({ id });

		return { ok: true };
	}

	public async patchUser(data: PatchUserRequest) {
		const { userId, name } = data;

		const user = await this.usersRepository.findById(userId);

		if (!user)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				datails: 'User not found',
			});

		await this.usersRepository.update(userId, {
			...(name !== undefined && { name }),
		});

		return { ok: true };
	}
}
