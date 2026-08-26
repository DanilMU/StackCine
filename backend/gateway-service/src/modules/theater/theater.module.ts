import { Module } from '@nestjs/common';
import { GrpcModule } from '@stackcine/common';

import { TheaterController } from './theater.controller';
import { TheaterClientGrpc } from './theater.grpc';

@Module({
	imports: [GrpcModule.register(['THEATER_PACKAGE'])],
	controllers: [TheaterController],
	providers: [TheaterClientGrpc],
})
export class TheaterModule {}
