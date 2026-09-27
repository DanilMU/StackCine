import { Injectable } from '@nestjs/common';

import { HealthResponse } from './dto';

@Injectable()
export class AppService {
	public getHello() {
		return { message: 'Welcome to the StackCine API' };
	}

	public health(): HealthResponse {
		return new HealthResponse('ok', new Date().toISOString());
	}
}
