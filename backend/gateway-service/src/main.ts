import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './core/app.module';
import {
	getCorsConfig,
	getValidationPipeConfig,
	setupSwagger,
} from './core/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService);
	const logger = new Logger();

	app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()));

	app.enableCors(getCorsConfig(config));

	setupSwagger(app);

	const port = config.getOrThrow<number>('HTTP_PORT');
	const host = config.getOrThrow<string>('HTTP_HOST');

	await app.listen(port, host);

	logger.log(`🚀 Gateway service is running on: http://${host}:${port}`);
	logger.log(`📜 Swagger docs available at: http://${host}:${port}/docs`);
}
bootstrap();
