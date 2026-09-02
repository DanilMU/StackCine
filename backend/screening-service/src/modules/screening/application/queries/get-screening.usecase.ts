import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcStatus } from '@stackcine/common';

import {
	HallPort,
	MoviePort,
	ScreeningRepositoryPort,
	SeatPort,
	TheaterPort,
} from '../../domain/ports';

@Injectable()
export class GetScreeningUsecase {
	public constructor(
		private readonly repository: ScreeningRepositoryPort,
		private readonly theaterPort: TheaterPort,
		private readonly hallPort: HallPort,
		private readonly seatPort: SeatPort,
		private readonly moviePort: MoviePort,
	) {}

	public async execute(id: string) {
		const screening = await this.repository.findById(id);

		if (!screening)
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Screening not found',
			});

		const [hall, movie] = await Promise.all([
			this.hallPort.findById(screening.hallId),
			this.moviePort.findById(screening.movieId),
		]);

		if (!hall || !movie) return null;

		const [theater, seatTypes] = await Promise.all([
			this.theaterPort.findById(hall.theaterId),
			this.seatPort.listSeatTypes(screening.hallId, screening.id),
		]);

		if (!theater) return null;

		return {
			id: screening.id,
			startAt: screening.startAt,
			endAt: screening.endAt,
			hall,
			movie,
			theater,
			seatTypes,
		};
	}
}
