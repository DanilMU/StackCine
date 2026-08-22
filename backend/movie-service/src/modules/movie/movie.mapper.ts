import type { Movie, MovieDetails } from '@stackcine/contracts/gen/ts/movie';

export class MovieMapper {
	public static toMovie(entity: any): Movie {
		return {
			id: entity.id,
			title: entity.title,
			slug: entity.slug,
			poster: entity.poster,
			ratingAge: entity.ratingAge ?? 0,
			releaseDate: MovieMapper.toDate(entity.releaseDate),
		};
	}

	public static toMovieDetails(entity: any): MovieDetails {
		return {
			id: entity.id,
			title: entity.title,
			slug: entity.slug,
			description: entity.description,
			poster: entity.poster,
			banner: entity.banner,
			duration: entity.duration ?? 0,
			ratingAge: entity.ratingAge ?? 0,
			country: entity.country ?? '',
			releaseDate: MovieMapper.toDate(entity.releaseDate),
		};
	}

	private static toDate(date: Date | string | null | undefined) {
		if (!date) return undefined;
		const d = typeof date === 'string' ? new Date(date) : date;
		const ms = d.getTime();
		if (isNaN(ms)) return undefined;

		return {
			seconds: Math.floor(ms / 1000),
			nanos: (ms % 1000) * 1_000_000,
		};
	}
}
