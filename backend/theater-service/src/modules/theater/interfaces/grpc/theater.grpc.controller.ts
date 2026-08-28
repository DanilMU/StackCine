import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type {
	CreateTheaterRequest,
	CreateTheaterResponse,
	GetTheaterRequest,
	GetTheaterResponse,
	ListTheatersResponse,
} from '@stackcine/contracts/gen/ts/theater';

import { CreateTheaterUsecase } from '../../application/commands/create-theater.usecase';
import { GetTheaterUsecase } from '../../application/queries/get-theater.usecase';
import { ListTheaterUsecase } from '../../application/queries/list-theaters.usecase';

@Controller()
export class TheaterGrpcController {
	public constructor(
		private readonly listUC: ListTheaterUsecase,
		private readonly getUC: GetTheaterUsecase,
		private readonly createUC: CreateTheaterUsecase,
	) {}

	@GrpcMethod('TheaterService', 'ListTheaters')
	public async getAll(): Promise<ListTheatersResponse> {
		const theaters = await this.listUC.execute();

		return { theaters };
	}

	@GrpcMethod('TheaterService', 'GetTheater')
	public async getById(
		data: GetTheaterRequest,
	): Promise<GetTheaterResponse> {
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
