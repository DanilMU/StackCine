import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Query,
} from '@nestjs/common';

import { CreateScreeningRequest, GetScreeningsRequest } from './dto';
import { ScreeningClientGrpc } from './screening.grpc';

@Controller('screenings')
export class ScreeningController {
	public constructor(private readonly screening: ScreeningClientGrpc) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	public async create(@Body() dto: CreateScreeningRequest) {
		return this.screening.call('createScreening', dto);
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll(@Query() dto: GetScreeningsRequest) {
		const response = await this.screening.call('getScreenings', dto);

		return Array.isArray(response.screenings)
			? response.screenings
			: [];
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	public async getById(@Param('id') id: string) {
		const response = await this.screening.call('getScreening', { id });

		return response.screening;
	}

	@Get('movie/:movieId')
	@HttpCode(HttpStatus.OK)
	public async getByMovie(
		@Param('movieId') movieId: string,
		@Query('date') date?: string,
	) {
		const response = await this.screening.call('getScreeningsByMovie', {
			movieId,
			date,
		});

		return Array.isArray(response.screenings)
			? response.screenings
			: [];
	}
}
