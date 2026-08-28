import { Module } from '@nestjs/common';

import { CreateTheaterUsecase } from '../application/commands/create-theater.usecase';
import { GetTheaterUsecase } from '../application/queries/get-theater.usecase';
import { ListTheaterUsecase } from '../application/queries/list-theaters.usecase';
import { TheaterRepositoryPort } from '../domain/ports/teather.repository.port';
import { TheaterGrpcController } from '../interfaces/grpc/theater.grpc.controller';

import { TheaterPrismaRepository } from './prisma/theater.prisma.repository';

@Module({
	controllers: [TheaterGrpcController],
	providers: [
		{
			provide: TheaterRepositoryPort,
			useClass: TheaterPrismaRepository,
		},
		ListTheaterUsecase,
		GetTheaterUsecase,
		CreateTheaterUsecase,
	],
})
export class TheaterModule {}
