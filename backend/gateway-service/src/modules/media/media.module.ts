import { Module } from '@nestjs/common';
import { GrpcModule } from '@stackcine/common';

import { MediaClientGrpc } from './media.grpc';

@Module({
	imports: [GrpcModule.register(['MEDIA_PACKAGE'])],
	providers: [MediaClientGrpc],
	exports: [MediaClientGrpc],
})
export class MediaModule {}
