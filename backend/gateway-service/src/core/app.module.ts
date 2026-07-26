import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@stackcine/passport';
import { AccountModule } from 'src/modules/account/account.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getPassportConfig } from './config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env.local',
		}),
		PassportModule.registerAsync({
			usefactory: getPassportConfig,
			inject: [ConfigService],
		}),
		AuthModule,
		AccountModule,
		UsersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
