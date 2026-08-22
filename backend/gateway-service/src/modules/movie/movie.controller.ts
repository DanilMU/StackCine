import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Query,
} from '@nestjs/common';

import { GetMoviesRequest } from './dto';
import { MovieClientGrpc } from './movie.grpc';

@Controller('movies')
export class MovieController {
	public constructor(private readonly movie: MovieClientGrpc) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll(@Query() dto: GetMoviesRequest) {
		return this.movie.call('listMovies', {
			category: dto.category ?? '',
			random: dto.random === true,
			limit: dto.limit ?? 0,
		});
	}

	@Get(':slug')
	@HttpCode(HttpStatus.OK)
	public async getBySlug(@Param('slug') slug: string) {
		return this.movie.call('getMovie', { slug });
	}
}
