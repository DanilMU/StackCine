import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@stackcine/passport';
import { AccountModule } from 'src/modules/account/account.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CategoryModule } from 'src/modules/category/category.module';
import { HallModule } from 'src/modules/hall/hall.module';
import { MovieModule } from 'src/modules/movie/movie.module';
import { PaymentModule } from 'src/modules/payment/payment.module';
import { ScreeningModule } from 'src/modules/screening/screening.module';
import { SeatModule } from 'src/modules/seat/seat.module';
import { TheaterModule } from 'src/modules/theater/theater.module';
import { UsersModule } from 'src/modules/users/users.module';
import { WebhookModule } from 'src/modules/webhook/webhook.module';
import { ObservabilityModule } from 'src/observability/observability.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getPassportConfig } from './config';

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
		PassportModule.registerAsync({
			usefactory: getPassportConfig,
			inject: [ConfigService],
		}),
		ObservabilityModule,
		AuthModule,
		AccountModule,
		UsersModule,
		MovieModule,
		CategoryModule,
		TheaterModule,
		HallModule,
		SeatModule,
		ScreeningModule,
		PaymentModule,
		WebhookModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
