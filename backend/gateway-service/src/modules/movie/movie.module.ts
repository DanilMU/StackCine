import { Module } from '@nestjs/common';
import { GrpcModule } from '@stackcine/common';

import { MovieController } from './movie.controller';
import { MovieClientGrpc } from './movie.grpc';

@Module({
	imports: [GrpcModule.register(['MOVIE_PACKAGE'])],
	controllers: [MovieController],
	providers: [MovieClientGrpc],
})
export class MovieModule {}
