import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@stackcine/passport';

import { getPassportConfig } from '@/config';
import { UserRepository } from '@/shared/repositories';

import { OtpService } from '../otp/otp.service';

import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
	imports: [
		PassportModule.registerAsync({
			usefactory: getPassportConfig,
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, AuthRepository, UserRepository, OtpService],
})
export class AuthModule {}
