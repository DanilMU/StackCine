import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { HallServiceClient } from '@stackcine/contracts/gen/ts/hall';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class HallClientGrpc extends AbstractGrpcClient<HallServiceClient> {
	constructor(@InjectGrpcClient('HALL_PACKAGE') client: ClientGrpc) {
		super(client, 'HallService');
	}
}
