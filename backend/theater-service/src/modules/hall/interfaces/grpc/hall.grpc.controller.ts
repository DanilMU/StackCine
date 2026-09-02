import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type {
	CreateHallRequest,
	CreateHallResponse,
	GetHallRequest,
	GetHallResponse,
	ListHallsRequest,
	ListHallsResponse,
} from '@stackcine/contracts/gen/ts/hall';

import { CreateHallUseCase } from '../../application/commands/create-hall.usecase';
import { GetHallUsecase } from '../../application/queries/get-hall.usecase';
import { ListHallUsecase } from '../../application/queries/list-halls.usecase';

@Controller()
export class HallGrpcController {
	public constructor(
		private readonly listUC: ListHallUsecase,
		private readonly getUC: GetHallUsecase,
		private readonly createUC: CreateHallUseCase,
	) {}

	@GrpcMethod('HallService', 'CreateHall')
	public async create(
		data: CreateHallRequest,
	): Promise<CreateHallResponse> {
		const hall = await this.createUC.execute(data);

		return { hall };
	}

	@GrpcMethod('HallService', 'GetHall')
	public async getById(data: GetHallRequest): Promise<GetHallResponse> {
		const hall = await this.getUC.execute(data.id);

		return { hall };
	}

	@GrpcMethod('HallService', 'ListHallsByTheater')
	public async getAll(data: ListHallsRequest): Promise<ListHallsResponse> {
		const halls = await this.listUC.execute(data.theaterId);

		return { halls };
	}
}
