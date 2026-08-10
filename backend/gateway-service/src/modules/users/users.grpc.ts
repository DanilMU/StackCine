import { Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type {
	GetMeRequest,
	PatchUserRequest,
	UsersServiceClient,
} from '@stackcine/contracts/gen/users';

@Injectable()
export class UsersClientGrpc implements OnModuleInit {
	private usersService!: UsersServiceClient;

	public constructor(
		@InjectGrpcClient('USERS_PACKAGE') private readonly client: ClientGrpc,
	) {}

	public onModuleInit() {
		this.usersService =
			this.client.getService<UsersServiceClient>('UsersService');
	}

	public getMe(request: GetMeRequest) {
		return this.usersService.getMe(request);
	}

	public patchUser(request: PatchUserRequest) {
		return this.usersService.patchUser(request);
	}
}
