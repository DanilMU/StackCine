import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/infra/database/database.module';
import { MovieModule } from 'src/modules/movie/movie.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		DatabaseModule,
		MovieModule,
	],
})
export class AppModule {}
