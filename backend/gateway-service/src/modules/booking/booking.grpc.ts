import { Injectable } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { InjectGrpcClient } from '@stackcine/common';
import type { BookingServiceClient } from '@stackcine/contracts/gen/ts/booking';
import { AbstractGrpcClient } from 'src/shared/grpc';

@Injectable()
export class BookingClientGrpc extends AbstractGrpcClient<BookingServiceClient> {
	constructor(@InjectGrpcClient('BOOKING_PACKAGE') client: ClientGrpc) {
		super(client, 'BookingService');
	}
}
