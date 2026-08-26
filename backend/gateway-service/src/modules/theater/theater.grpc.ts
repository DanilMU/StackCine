import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { TheaterServiceClient } from '@stackcine/contracts/gen/ts/theater';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class TheaterClientGrpc extends AbstractGrpcClient<TheaterServiceClient> {
	constructor(@InjectGrpcClient('THEATER_PACKAGE') client: ClientGrpc) {
		super(client, 'TheaterService');
	}
}
