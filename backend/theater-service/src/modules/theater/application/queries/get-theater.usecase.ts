import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcStatus } from '@stackcine/common';

import { TheaterRepositoryPort } from '../../domain/ports/teather.repository.port';

@Injectable()
export class GetTheaterUsecase {
	public constructor(private readonly repository: TheaterRepositoryPort) {}

	public async execute(id: string) {
		const theater = await this.repository.findById(id);

		if (!theater)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'Theater not found',
			});

		return theater;
	}
}
