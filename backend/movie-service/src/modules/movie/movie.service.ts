import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcStatus } from '@stackcine/common';
import type {
	GetMovieRequest,
	GetMovieResponse,
	ListMoviesRequest,
	ListMoviesResponse,
} from '@stackcine/contracts/gen/ts/movie';

import { MovieMapper } from './movie.mapper';
import { MovieRepository } from './movie.repository';

@Injectable()
export class MovieService {
	public constructor(private readonly movieRepository: MovieRepository) {}

	public async getAll(data: ListMoviesRequest): Promise<ListMoviesResponse> {
		const filter: ListMoviesRequest = {
			category: data.category || '',
			random: data.random === true,
			limit: data.limit && data.limit > 0 ? data.limit : 0,
		};

		const movies = await this.movieRepository.findAll(filter);

		return {
			movies: movies.map((movie) => MovieMapper.toMovie(movie)),
		};
	}

	public async getOne(data: GetMovieRequest): Promise<GetMovieResponse> {
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

		return { movie: MovieMapper.toMovieDetails(movie) };
	}
}
