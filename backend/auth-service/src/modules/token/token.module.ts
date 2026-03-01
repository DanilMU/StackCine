import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@stackcine/passport';

import { getPassportConfig } from '@/config';

import { TokenService } from './token.service';

@Module({
	imports: [
		PassportModule.registerAsync({
			usefactory: getPassportConfig,
			inject: [ConfigService],
		}),
	],
	providers: [TokenService],
	exports: [TokenService],
})
export class TokenModule {}
