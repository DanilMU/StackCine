import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { type MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PROTO_PATHS } from '@stackcine/contracts';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService);

	const url = `${config.getOrThrow('GRPC_HOST')}:${config.getOrThrow('GRPC_PORT')}`;

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			package: ['payment.v1', 'refund.v1'],
			protoPath: [PROTO_PATHS.PAYMENT, PROTO_PATHS.REFUND],
			url,
			loader: {
				keepCase: false,
				longs: String,
				enums: String,
				defaults: true,
				oneofs: true,
			},
		},
	});

	await app.startAllMicroservices();
	await app.init();
}
bootstrap();
