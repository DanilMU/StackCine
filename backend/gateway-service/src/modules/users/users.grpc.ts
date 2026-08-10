import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { UsersServiceClient } from '@stackcine/contracts/gen/users';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class UsersClientGrpc extends AbstractGrpcClient<UsersServiceClient> {
	constructor(@InjectGrpcClient('USERS_PACKAGE') client: ClientGrpc) {
		super(client, 'UsersService');
	}
}
