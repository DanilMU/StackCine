import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { SeatServiceClient } from '@stackcine/contracts/gen/ts/seat';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class SeatClientGrpc extends AbstractGrpcClient<SeatServiceClient> {
	constructor(@InjectGrpcClient('SEAT_PACKAGE') client: ClientGrpc) {
		super(client, 'SeatService');
	}
}
