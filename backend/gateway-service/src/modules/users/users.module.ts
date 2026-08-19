import { Module } from '@nestjs/common';
import { GrpcModule } from '@stackcine/common';

import { MediaClientGrpc } from '../media/media.grpc';

import { UsersController } from './users.controller';
import { UsersClientGrpc } from './users.grpc';

@Module({
	imports: [GrpcModule.register(['USERS_PACKAGE', 'MEDIA_PACKAGE'])],
	controllers: [UsersController],
	providers: [UsersClientGrpc, MediaClientGrpc],
})
export class UsersModule {}
