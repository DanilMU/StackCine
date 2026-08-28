import { Module } from '@nestjs/common';
import { GrpcModule } from '@stackcine/common';

import { SeatController } from './seat.controller';
import { SeatClientGrpc } from './seat.grpc';

@Module({
	imports: [GrpcModule.register(['SEAT_PACKAGE'])],
	controllers: [SeatController],
	providers: [SeatClientGrpc],
})
export class SeatModule {}
