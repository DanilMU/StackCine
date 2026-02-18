import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function getSwaggerConfig() {
	return new DocumentBuilder()
		.setTitle('StackCine API')
		.setDescription('API Gateway for StackCine microservices')
		.setVersion('1.0.0')
		.addBearerAuth()
		.build();
}

export function setupSwagger(app: INestApplication) {
	const swaggerConfig = getSwaggerConfig();
	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup('/docs', app, swaggerDocument, {
		yamlDocumentUrl: '/openapi.yaml',
	});
}
