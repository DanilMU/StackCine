import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { RmqModule } from './infrastructure/rmq/rmq.module';
import { NodtificationsModule } from './modules/nodtifications/nodtifications.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
			expandVariables: true,
		}),
		RmqModule,
		NodtificationsModule,
	],
})
export class AppModule {}
