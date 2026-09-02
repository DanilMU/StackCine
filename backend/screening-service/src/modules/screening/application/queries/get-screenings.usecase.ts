import { Injectable } from '@nestjs/common';
import { resolveDayRange } from 'src/shared/utils/resolve-day-range';

import { Hall, Movie, Theater } from '../../domain/interface';
import {
	HallPort,
	MoviePort,
	ScreeningRepositoryPort,
	SeatPort,
	TheaterPort,
} from '../../domain/ports';

@Injectable()
export class GetScreeningsUsecase {
	public constructor(
		private readonly repository: ScreeningRepositoryPort,
		private readonly theaterPort: TheaterPort,
		private readonly hallPort: HallPort,
		private readonly seatPort: SeatPort,
		private readonly moviePort: MoviePort,
	) {}

	public async execute(input: { date?: string; theaterId?: string }) {
		let start: Date | undefined;
		let end: Date | undefined;

		if (input.date) {
			const range = resolveDayRange(input.date);
			start = range.start;
			end = range.end;
		}

		let hallIds: string[] | undefined;

		if (input.theaterId) {
			const halls = await this.hallPort.listByTheater(
				input.theaterId,
			);

			if (!halls.length) return [];

			hallIds = halls.map((h) => h.id);
		}

		const screenings = await this.repository.findByDateRange(
			start,
			end,
			hallIds,
		);

		if (!screenings.length) return [];

		const theaterCache = new Map<string, Promise<Theater | null>>();
		const hallCache = new Map<string, Promise<Hall | null>>();
		const movieCache = new Map<string, Promise<Movie | null>>();

		const enriched = await Promise.all(
			screenings.map(async (screening) => {
				const hall = await this.getHallCached(
					screening.hallId,
					hallCache,
				);

				if (!hall) return null;

				const theater = await this.getTheaterCached(
					hall.theaterId,
					theaterCache,
				);

				if (!theater) return null;

				const movie = await this.getMovieCached(
					screening.movieId,
					movieCache,
				);

				if (!movie) return null;

				const seatTypes = await this.seatPort.listSeatTypes(
					screening.hallId,
					screening.id,
				);

				return {
					id: screening.id,
					startAt: screening.startAt,
					endAt: screening.endAt,
					hall,
					theater,
					movie,
					seatTypes,
				};
			}),
		);

		return enriched.filter(Boolean);
	}

	private getTheaterCached(
		theaterId: string,
		cache: Map<string, Promise<Theater | null>>,
	): Promise<Theater | null> {
		let promise = cache.get(theaterId);

		if (!promise) {
			promise = this.theaterPort.findById(theaterId);

			cache.set(theaterId, promise);
		}

		return promise;
	}

	private getHallCached(
		hallId: string,
		cache: Map<string, Promise<Hall | null>>,
	): Promise<Hall | null> {
		let promise = cache.get(hallId);

		if (!promise) {
			promise = this.hallPort.findById(hallId);

			cache.set(hallId, promise);
		}

		return promise;
	}

	private getMovieCached(
		movieId: string,
		cache: Map<string, Promise<Movie | null>>,
	): Promise<Movie | null> {
		let promise = cache.get(movieId);

		if (!promise) {
			promise = this.moviePort.findById(movieId);

			cache.set(movieId, promise);
		}

		return promise;
	}
}
