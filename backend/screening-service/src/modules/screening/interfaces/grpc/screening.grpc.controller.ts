import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type {
	CreateScreeningRequest,
	GetScreeningRequest,
	GetScreeningsByMovieRequest,
	GetScreeningsRequest,
} from '@stackcine/contracts/gen/ts/screening';

import { CreateScreeningUsecase } from '../../application/commands/create-screening.usecase';
import { GetScreeningUsecase } from '../../application/queries/get-screening.usecase';
import { GetScreeningsByMovieUsecase } from '../../application/queries/get-screenings-by-movie.usecase';
import { GetScreeningsUsecase } from '../../application/queries/get-screenings.usecase';

@Controller()
export class ScreeningGrpcController {
	public constructor(
		private readonly createUC: CreateScreeningUsecase,
		private readonly getUC: GetScreeningUsecase,
		private readonly listUC: GetScreeningsUsecase,
		private readonly getByMovieUC: GetScreeningsByMovieUsecase,
	) {}

	@GrpcMethod('ScreeningService', 'CreateScreening')
	public async create(data: CreateScreeningRequest) {
		return await this.createUC.execute(data);
	}

	@GrpcMethod('ScreeningService', 'GetScreening')
	public async getById(data: GetScreeningRequest) {
		const screening = await this.getUC.execute(data.id);

		return { screening };
	}

	@GrpcMethod('ScreeningService', 'GetScreenings')
	public async getAll(data: GetScreeningsRequest) {
		const screenings = await this.listUC.execute(data);

		return { screenings };
	}

	@GrpcMethod('ScreeningService', 'GetScreeningsByMovie')
	public async getByMovie(data: GetScreeningsByMovieRequest) {
		const screenings = await this.getByMovieUC.execute(data);

		return { screenings };
	}
}
