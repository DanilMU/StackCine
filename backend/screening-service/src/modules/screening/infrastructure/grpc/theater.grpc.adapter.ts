import { Inject, Injectable, type OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import type {
	Theater,
	TheaterServiceClient,
} from '@stackcine/contracts/gen/ts/theater';
import { lastValueFrom } from 'rxjs';
import { TheaterPort } from 'src/modules/screening/domain/ports';

@Injectable()
export class TheaterGrpcAdapter implements TheaterPort, OnModuleInit {
	private service: TheaterServiceClient;

	public constructor(
		@Inject('THEATER_PACKAGE') private readonly clients: ClientGrpc,
	) {}

	public onModuleInit() {
		this.service =
			this.clients.getService<TheaterServiceClient>(
				'TheaterService',
			);
	}

	public async findById(id: string): Promise<Theater | null> {
		const res = await lastValueFrom(this.service.getTheater({ id }));

		return res.theater ?? null;
	}
}
