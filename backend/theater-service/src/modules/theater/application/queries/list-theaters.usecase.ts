import { Injectable } from '@nestjs/common';

import { TheaterRepositoryPort } from '../../domain/ports/teather.repository.port';

@Injectable()
export class ListTheaterUsecase {
	public constructor(private readonly repository: TheaterRepositoryPort) {}

	public execute() {
		return this.repository.findAll();
	}
}
