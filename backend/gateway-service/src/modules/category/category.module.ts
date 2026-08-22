import { Module } from '@nestjs/common';
import { GrpcModule } from '@stackcine/common';

import { CategoryController } from './category.controller';
import { CategoryClientGrpc } from './category.grpc';

@Module({
	imports: [GrpcModule.register(['CATEGORY_PACKAGE'])],
	controllers: [CategoryController],
	providers: [CategoryClientGrpc],
})
export class CategoryModule {}
