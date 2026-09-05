import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { YookassaModule } from 'nestjs-yookassa';

import { getYookassaConfig } from './config/yookassa.config';
import { PrismaModule } from './infra/prisma/prisma.module';
import { PaymentModule } from './modules/payment/payment.module';
import { RefundModule } from './modules/refund/refund.module';

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
		YookassaModule.forRootAsync({
			useFactory: getYookassaConfig,
			inject: [ConfigService],
		}),
		PrismaModule,
		PaymentModule,
		RefundModule,
	],
})
export class AppModule {}
