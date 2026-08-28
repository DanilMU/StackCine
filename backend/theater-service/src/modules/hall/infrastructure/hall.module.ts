import { Module } from '@nestjs/common';

import { CreateHallUseCase } from '../application/commands/create-hall.usecase';
import { GetHallUsecase } from '../application/queries/get-hall.usecase';
import { ListHallUsecase } from '../application/queries/list-halls.usecase';
import { HallRepositoryPort } from '../domain/ports/hall.repository.port';
import { HallGrpcController } from '../interfaces/grpc/hall.grpc.controller';

import { HallPrismaRepository } from './prisma/hall.prisma.repository';

@Module({
	controllers: [HallGrpcController],
	providers: [
		{
			provide: HallRepositoryPort,
			useClass: HallPrismaRepository,
		},
		ListHallUsecase,
		GetHallUsecase,
		CreateHallUseCase,
	],
})
export class HallModule {}
