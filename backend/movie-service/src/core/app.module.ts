import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/infra/database/database.module';
import { RedisModule } from 'src/infra/redis/redis.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { MovieModule } from 'src/modules/movie/movie.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.${process.env.NODE_ENV}.local`,
				`.env.${process.env.NODE_ENV}`,
				'.env',
			],
		}),
		DatabaseModule,
		RedisModule,
		MovieModule,
		CategoryModule,
	],
})
export class AppModule {}
