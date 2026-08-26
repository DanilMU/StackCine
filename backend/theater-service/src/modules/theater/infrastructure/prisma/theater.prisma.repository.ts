import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/infra/prisma/prisma.service';

import { TheaterEntity } from '../../domain/entities/theater.entiti';
import { TheaterRepositoryPort } from '../../domain/ports/teather.repository.port';

@Injectable()
export class TheaterPrismaRepository implements TheaterRepositoryPort {
	public constructor(private readonly prismaService: PrismaService) {}

	public async findAll(): Promise<TheaterEntity[]> {
		const items = await this.prismaService.theater.findMany({
			orderBy: { name: 'asc' },
		});

		return items.map(
			(t) =>
				new TheaterEntity(
					t.id,
					t.name,
					t.address,
					t.createdAt,
					t.updatedAt,
				),
		);
	}

	public async findById(id: string): Promise<TheaterEntity | null> {
		const t = await this.prismaService.theater.findUnique({
			where: { id },
		});

		return t
			? new TheaterEntity(
					t.id,
					t.name,
					t.address,
					t.createdAt,
					t.updatedAt,
				)
			: null;
	}

	public async create(data: {
		name: string;
		address: string;
	}): Promise<TheaterEntity> {
		const t = await this.prismaService.theater.create({ data });

		return new TheaterEntity(
			t.id,
			t.name,
			t.address,
			t.createdAt,
			t.updatedAt,
		);
	}
}
