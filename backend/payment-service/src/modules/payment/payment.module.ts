import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { YookassaModule } from 'nestjs-yookassa';

import { getYookassaConfig } from '@/config/yookassa.config';

import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { PaymentService } from './payment.service';

@Module({
	imports: [
		YookassaModule.forRootAsync({
			useFactory: getYookassaConfig,
			inject: [ConfigService],
		}),
	],
	controllers: [PaymentController],
	providers: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
