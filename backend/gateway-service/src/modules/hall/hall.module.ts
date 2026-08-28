import { Module } from '@nestjs/common';
import { GrpcModule } from '@stackcine/common';

import { HallController } from './hall.controller';
import { HallClientGrpc } from './hall.grpc';

@Module({
	imports: [GrpcModule.register(['HALL_PACKAGE'])],
	controllers: [HallController],
	providers: [HallClientGrpc],
})
export class HallModule {}
