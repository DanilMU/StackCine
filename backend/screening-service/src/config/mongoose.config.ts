import { ConfigService } from '@nestjs/config';
import type { MongooseModuleOptions } from '@nestjs/mongoose';

export function getMongooseConfig(
	configService: ConfigService,
): MongooseModuleOptions {
	return {
		uri: configService.getOrThrow('MONGODB_URI'),
		serverSelectionTimeoutMS: 5000,
	};
}
