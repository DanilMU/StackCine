import { Global, Module } from '@nestjs/common';
import { GrpcModule } from '@stackcine/common';

import { RefundController } from './refund.controller';
import { RefundClientGrpc } from './refund.grpc';

@Global()
@Module({
	imports: [GrpcModule.register(['REFUND_PACKAGE'])],
	controllers: [RefundController],
	providers: [RefundClientGrpc],
	exports: [RefundClientGrpc],
})
export class RefundModule {}
