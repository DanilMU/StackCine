import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import type { HallServiceClient } from '@stackcine/contracts/gen/ts/hall';
import { lastValueFrom } from 'rxjs';
import { Hall } from 'src/modules/screening/domain/interface';
import { HallPort } from 'src/modules/screening/domain/ports';

@Injectable()
export class HallGrpcAdapter implements HallPort, OnModuleInit {
	private service: HallServiceClient;

	public constructor(
		@Inject('HALL_PACKAGE') private readonly client: ClientGrpc,
	) {}

	public onModuleInit() {
		this.service =
			this.client.getService<HallServiceClient>('HallService');
	}

	public async findById(id: string): Promise<Hall | null> {
		const res = await lastValueFrom(this.service.getHall({ id }));

		return res.hall ?? null;
	}

	public async listByTheater(theaterId: string): Promise<Hall[]> {
		const res = await lastValueFrom(
			this.service.listHallsByTheater({ theaterId }),
		);

		return res.halls;
	}
}
