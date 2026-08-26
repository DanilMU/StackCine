import { Module } from '@nestjs/common';

import { CreateTheaterUseCase } from '../application/commands/create-theater.usecase';
import { GetTheaterUsecase } from '../application/queries/get-theater.usecase';
import { ListTheaterUseCase } from '../application/queries/list-theaters.usecase';
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
		ListTheaterUseCase,
		GetTheaterUsecase,
		CreateTheaterUseCase,
	],
})
export class TheaterModule {}
