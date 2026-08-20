import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import type { SeedOptions } from './contracts';
import { DatabaseSeeder } from './database.seeder';
import { SeedModule } from './seed.module';

async function bootstrap() {
	const logger = new Logger('SeederCLI');

	const app = await NestFactory.createApplicationContext(SeedModule, {
		logger: ['log', 'warn', 'error'],
	});

	const seeder = app.get(DatabaseSeeder);

	const args = process.argv.slice(2);
	const options: SeedOptions = {
		fresh: args.includes('--fresh') || args.includes('-f'),
		target: args.filter((arg) => !arg.startsWith('-')),
	};

	try {
		await seeder.run(options);
		await app.close();
		process.exit(0);
	} catch (error) {
		logger.error('Database seeding failed with error:', error);
		await app.close();
		process.exit(1);
	}
}

void bootstrap();
