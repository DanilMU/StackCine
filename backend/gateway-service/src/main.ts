import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './core/app.module';
import {
	getCorsConfig,
	getValidationPipeConfig,
	setupSwagger,
} from './core/config';
import { GrpcExceptionFilter } from './shared/filters';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = app.get(ConfigService);
	const logger = new Logger();

	app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')));

	app.useGlobalPipes(new ValidationPipe(getValidationPipeConfig()));

	app.useGlobalFilters(new GrpcExceptionFilter());

	app.enableCors(getCorsConfig(config));

	setupSwagger(app);

	const port = config.getOrThrow<number>('HTTP_PORT');
	const host = config.getOrThrow<string>('HTTP_HOST');

	await app.listen(port, host);

	logger.log(`🚀 Gateway service is running on: http://${host}:${port}`);
	logger.log(`📜 Swagger docs available at: http://${host}:${port}/docs`);
}
bootstrap();
