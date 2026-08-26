import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
} from '@nestjs/common';
import { Role } from '@stackcine/common';
import { Theater } from '@stackcine/contracts/gen/ts/theater';
import { Protected } from 'src/shared/decorators';

import { CreateTheaterRequest } from './dto';
import { TheaterClientGrpc } from './theater.grpc';

@Controller('theaters')
export class TheaterController {
	public constructor(private readonly theater: TheaterClientGrpc) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public async getAll(): Promise<Theater[]> {
		const response = await this.theater.call('listTheaters', {});

		return Array.isArray(response.theaters) ? response.theaters : [];
	}

	// @Protected(Role.ADMIN)
	@Post()
	@HttpCode(HttpStatus.OK)
	public async create(@Body() dto: CreateTheaterRequest) {
		return await this.theater.call('createTheater', dto);
	}
}
