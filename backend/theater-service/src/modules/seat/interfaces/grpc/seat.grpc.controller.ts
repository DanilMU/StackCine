import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type {
	GetSeatRequest,
	GetSeatResponse,
	ListSeatsRequest,
	ListSeatsResponse,
} from '@stackcine/contracts/gen/ts/seat';

import { GetSeatUsecase } from '../../application/queries/get-seat.usecase';
import { ListSeatsUsecase } from '../../application/queries/list-seats.usecase';

@Controller()
export class SeatGrpcController {
	public constructor(
		private readonly listUC: ListSeatsUsecase,
		private readonly getUC: GetSeatUsecase,
	) {}

	@GrpcMethod('SeatService', 'GetSeat')
	public async getById(data: GetSeatRequest): Promise<GetSeatResponse> {
		const seat = await this.getUC.execute(data.id);

		return {
			seat: {
				id: seat.id,
				row: seat.row,
				number: seat.number,
				price: seat.price,
				type: seat.type,
				hallId: seat.hallId,
				status: 'available',
			},
		};
	}

	@GrpcMethod('SeatService', 'ListSeatsByHall')
	public async getAll(data: ListSeatsRequest): Promise<ListSeatsResponse> {
		const seats = await this.listUC.execute(
			data.hallId,
			data.screeningId,
		);

		return { seats };
	}
}
