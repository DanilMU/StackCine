import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core/app.module";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const logger = new Logger();

  app.enableCors({
    origin: config.getOrThrow<string>("HTTP_CORS").split(","),
    credentianls: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle("StackCine API")
    .setDescription("API Gateway for StackCine microservices")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup("/docs", app, swaggerDocument, {
    yamlDocumentUrl: "/openapi.yaml",
  });

  const port = config.getOrThrow<number>("HTTP_PORT");
  const host = config.getOrThrow<string>("HTTP_HOST");

  await app.listen(port, host);

  logger.log(`🚀 Gateway service is running on: http://${host}:${port}`);
  logger.log(`📜 Swagger docs available at: http://${host}:${port}/docs`);
}
bootstrap();
