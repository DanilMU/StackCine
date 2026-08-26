import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type {
	CreateTheaterRequest,
	CreateTheaterResponse,
	GetTheaterRequest,
	getTheaterResponse,
	ListTheatersResponse,
} from '@stackcine/contracts/gen/ts/theater';

import { CreateTheaterUseCase } from '../../application/commands/create-theater.usecase';
import { GetTheaterUsecase } from '../../application/queries/get-theater.usecase';
import { ListTheaterUseCase } from '../../application/queries/list-theaters.usecase';

@Controller()
export class TheaterGrpcController {
	public constructor(
		private readonly listUC: ListTheaterUseCase,
		private readonly getUC: GetTheaterUsecase,
		private readonly createUC: CreateTheaterUseCase,
	) {}

	@GrpcMethod('TheaterService', 'ListTheaters')
	public async getAll(): Promise<ListTheatersResponse> {
		const theaters = await this.listUC.execute();

		return { theaters };
	}

	@GrpcMethod('TheaterService', 'GetTheater')
	public async getById(
		data: GetTheaterRequest,
	): Promise<getTheaterResponse> {
		const theater = await this.getUC.execute(data.id);

		return { theater };
	}

	@GrpcMethod('TheaterService', 'CreateTheater')
	public async create(
		data: CreateTheaterRequest,
	): Promise<CreateTheaterResponse> {
		await this.createUC.execute(data);

		return { ok: true };
	}
}
