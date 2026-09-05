import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { RefundServiceClient } from '@stackcine/contracts/gen/ts/refund';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class RefundClientGrpc extends AbstractGrpcClient<RefundServiceClient> {
	constructor(@InjectGrpcClient('REFUND_PACKAGE') client: ClientGrpc) {
		super(client, 'RefundService');
	}
}
