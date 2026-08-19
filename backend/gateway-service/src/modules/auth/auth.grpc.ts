import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { AuthServiceClient } from '@stackcine/contracts/gen/ts/auth';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class AuthClientGrpc extends AbstractGrpcClient<AuthServiceClient> {
	constructor(@InjectGrpcClient('AUTH_PACKAGE') client: ClientGrpc) {
		super(client, 'AuthService');
	}
}
