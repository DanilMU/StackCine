import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { RowLayout } from '../../domain/interfaces';
import { HallRepositoryPort } from '../../domain/ports/hall.repository.port';

@Injectable()
export class CreateHallUseCase {
	public constructor(
		private readonly repository: HallRepositoryPort,
		// TODO: избавиться от PrismaService в use-case (спрятать внутрь HallRepository)
		private readonly prismaService: PrismaService,
	) {}

	public async execute(data: {
		name: string;
		theaterId: string;
		layout: RowLayout[];
	}) {
		return this.prismaService.$transaction(async () => {
			const hall = await this.repository.create(data);

			await this.repository.createSeats({
				hallId: hall.id,
				layout: data.layout,
			});

			return hall;
		});
	}
}
