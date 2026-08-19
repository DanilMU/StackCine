import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { AccountServiceClient } from '@stackcine/contracts/gen/ts/account';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class AccountClientGrpc extends AbstractGrpcClient<AccountServiceClient> {
	constructor(@InjectGrpcClient('ACCOUNT_PACKAGE') client: ClientGrpc) {
		super(client, 'AccountService');
	}
}
