import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { PaymentServiceClient } from '@stackcine/contracts/gen/ts/payment';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class PaymentClientGrpc extends AbstractGrpcClient<PaymentServiceClient> {
	constructor(@InjectGrpcClient('PAYMENT_PACKAGE') client: ClientGrpc) {
		super(client, 'PaymentService');
	}
}
