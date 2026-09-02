import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { ScreeningServiceClient } from '@stackcine/contracts/gen/ts/screening';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class ScreeningClientGrpc extends AbstractGrpcClient<ScreeningServiceClient> {
	constructor(@InjectGrpcClient('SCREENING_PACKAGE') client: ClientGrpc) {
		super(client, 'ScreeningService');
	}
}
