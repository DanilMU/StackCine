import { Injectable } from '@nestjs/common';

import { HallRepositoryPort } from '../../domain/ports/hall.repository.port';

@Injectable()
export class ListHallUsecase {
	public constructor(private readonly repository: HallRepositoryPort) {}

	public async execute(theaterId: string) {
		return this.repository.listByTheater(theaterId);
	}
}
