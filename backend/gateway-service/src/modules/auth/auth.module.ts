import { Module } from '@nestjs/common';
import { GrpcModule } from '@stackcine/common';

import { AuthController } from './auth.controller';
import { AuthClientGrpc } from './auth.grpc';

@Module({
	imports: [GrpcModule.register(['AUTH_PACKAGE'])],
	controllers: [AuthController],
	providers: [AuthClientGrpc],
})
export class AuthModule {}
