import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '../database.module';

import { DatabaseSeeder } from './database.seeder';
import { CategorySeeder, MovieSeeder } from './seeders';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule],
	providers: [CategorySeeder, MovieSeeder, DatabaseSeeder],
	exports: [DatabaseSeeder],
})
export class SeedModule {}
