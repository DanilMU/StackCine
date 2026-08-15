import { ConfigService } from '@nestjs/config';
import type { Params } from 'nestjs-pino';

export function getLoggerConfig(configService: ConfigService): Params {
	return {
		pinoHttp: {
			level: configService.get<string>('LOG_LEVEL') ?? 'info',
			transport: {
				target: 'pino/file',
				options: {
					destination: '/var/log/services/auth/auth.log',
					mkdir: true,
				},
			},
			messageKey: 'msg',
			customProps: () => ({
				service: 'auth-service',
			}),
		},
	};
}
