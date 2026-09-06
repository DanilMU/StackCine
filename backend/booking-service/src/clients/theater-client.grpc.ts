import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import {
	GetTheaterRequest,
	TheaterServiceClient,
} from '@stackcine/contracts/gen/ts/theater';

@Injectable()
export class TheaterClientGrpc implements OnModuleInit {
	private theaterService: TheaterServiceClient;

	public constructor(
		@Inject('THEATER_PACKAGE') private readonly client: ClientGrpc,
	) {}

	public onModuleInit() {
		this.theaterService =
			this.client.getService<TheaterServiceClient>(
				'TheaterService',
			);
	}

	public getById(data: GetTheaterRequest) {
		return this.theaterService.getTheater(data);
	}
}
