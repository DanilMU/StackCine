import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { PROTO_PATHS } from '@stackcine/contracts';

import { CreateScreeningUsecase } from './application/commands/create-screening.usecase';
import { GetScreeningUsecase } from './application/queries/get-screening.usecase';
import { GetScreeningsByMovieUsecase } from './application/queries/get-screenings-by-movie.usecase';
import { GetScreeningsUsecase } from './application/queries/get-screenings.usecase';
import {
    HallPort,
    MoviePort,
    ScreeningRepositoryPort,
    SeatPort,
    TheaterPort,
} from './domain/ports';
import { ScreeningMongoRepository } from './infrastructure/database/repositories/screening.mongo.repository';
import {
    ScreeningModel,
    ScreeningSchema,
} from './infrastructure/database/schemas/screening.schema';
import { HallGrpcAdapter } from './infrastructure/grpc/hall.grpc.adapter';
import { MovieGrpcAdapter } from './infrastructure/grpc/movie.grpc.adapter';
import { SeatGrpcAdapter } from './infrastructure/grpc/seat.grpc.adapter';
import { TheaterGrpcAdapter } from './infrastructure/grpc/theater.grpc.adapter';
import { ScreeningGrpcController } from './interfaces/grpc/screening.grpc.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: ScreeningModel.name,
				schema: ScreeningSchema,
			},
		]),
		ClientsModule.registerAsync([
			{
				name: 'MOVIE_PACKAGE',
				useFactory: (config: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'movie.v1',
						protoPath: PROTO_PATHS.MOVIE,
						url: config.getOrThrow<string>(
							'MOVIE_GRPC_URL',
						),
					},
				}),
				inject: [ConfigService],
			},
			{
				name: 'THEATER_PACKAGE',
				useFactory: (config: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'theater.v1',
						protoPath: PROTO_PATHS.THEATER,
						url: config.getOrThrow<string>(
							'THEATER_GRPC_URL',
						),
					},
				}),
				inject: [ConfigService],
			},
			{
				name: 'HALL_PACKAGE',
				useFactory: (config: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'hall.v1',
						protoPath: PROTO_PATHS.HALL,
						url: config.getOrThrow<string>(
							'THEATER_GRPC_URL',
						),
					},
				}),
				inject: [ConfigService],
			},
			{
				name: 'SEAT_PACKAGE',
				useFactory: (config: ConfigService) => ({
					transport: Transport.GRPC,
					options: {
						package: 'seat.v1',
						protoPath: PROTO_PATHS.SEAT,
						url: config.getOrThrow<string>(
							'THEATER_GRPC_URL',
						),
					},
				}),
				inject: [ConfigService],
			},
		]),
	],
	controllers: [ScreeningGrpcController],
	providers: [
		{
			provide: ScreeningRepositoryPort,
			useClass: ScreeningMongoRepository,
		},
		{
			provide: HallPort,
			useClass: HallGrpcAdapter,
		},
		{
			provide: MoviePort,
			useClass: MovieGrpcAdapter,
		},
		{
			provide: SeatPort,
			useClass: SeatGrpcAdapter,
		},
		{
			provide: TheaterPort,
			useClass: TheaterGrpcAdapter,
		},
		CreateScreeningUsecase,
		GetScreeningUsecase,
		GetScreeningsUsecase,
		GetScreeningsByMovieUsecase,
	],
})
export class ScreeningModule {}
