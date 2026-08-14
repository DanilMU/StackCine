import { ConfigService } from '@nestjs/config';
import { SmsOptions } from 'src/infrastructure/sms/interfeces';

export function getExolveConfig(configService: ConfigService): SmsOptions {
	return {
		apiKey: configService.getOrThrow<string>('exolve.apiKey'),
		sender: configService.getOrThrow<string>('exolve.sender'),
	};
}
