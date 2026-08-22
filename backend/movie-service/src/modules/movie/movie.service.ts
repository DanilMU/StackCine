import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcStatus } from '@stackcine/common';
import type {
	GetMovieRequest,
	GetMovieResponse,
	ListMoviesRequest,
	ListMoviesResponse,
	MovieDetails,
} from '@stackcine/contracts/gen/ts/movie';

import { MovieCacheKeys } from './movie.cache.keys';
import { MovieCacheService } from './movie.cache.service';
import { MovieMapper } from './movie.mapper';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
	public constructor(
		private readonly movieRepository: MovieRepository,
		private readonly movieCacheService: MovieCacheService,
	) {}

	public async getAll(
		data: ListMoviesRequest,
	): Promise<ListMoviesResponse> {
		const filter: ListMoviesRequest = {
			category: data.category || '',
			random: data.random === true,
			limit: data.limit && data.limit > 0 ? data.limit : 0,
		};

		const cached =
			await this.movieCacheService.getAll<
				ListMoviesResponse['movies']
			>(filter);

		if (cached) {
			return { movies: cached };
		}

		const movies = await this.movieRepository.findAll(filter);

		const result = movies.map(MovieMapper.toMovie);

		await this.movieCacheService.setAll(filter, result);

		return {
			movies: result,
		};
	}

	public async getOne(data: GetMovieRequest): Promise<GetMovieResponse> {
		const cacheKey = data.id
			? MovieCacheKeys.byId(data.id)
			: MovieCacheKeys.bySlug(data.slug);

		const cached =
			await this.movieCacheService.get<MovieDetails>(cacheKey);

		if (cached) {
			return { movie: cached };
		}

		const movie = await (data.id
			? this.movieRepository.findById(data.id)
			: data.slug
				? this.movieRepository.findBySlug(data.slug)
				: null);

		if (!movie) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				details: 'Movie not found',
			});
		}

		const mapped = MovieMapper.toMovieDetails(movie);
		await this.movieCacheService.set(cacheKey, mapped);

		return { movie: mapped };
	}
}
