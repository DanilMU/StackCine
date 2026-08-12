import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { MailModule } from './infrastructure/mail/mail.module';
import { RmqModule } from './infrastructure/rmq/rmq.module';
import { NodtificationsModule } from './modules/nodtifications/nodtifications.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: [
				`.env.${process.env.NODE_ENV}.local`,
				`.env.${process.env.NODE_ENV}`,
				'.env',
			],
			load: [configuration],
			expandVariables: true,
		}),
		RmqModule,
		NodtificationsModule,
		MailModule,
	],
})
export class AppModule {}
