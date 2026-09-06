import { Inject, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import {
	GetHallRequest,
	HallServiceClient,
} from '@stackcine/contracts/gen/ts/hall';

export class HallClientGrpc implements OnModuleInit {
	private hallService: HallServiceClient;

	public constructor(
		@Inject('HALL_SERVICE') private readonly client: ClientGrpc,
	) {}

	public onModuleInit() {
		this.hallService =
			this.client.getService<HallServiceClient>('HallService');
	}

	public getById(data: GetHallRequest) {
		return this.hallService.getHall(data);
	}
}
