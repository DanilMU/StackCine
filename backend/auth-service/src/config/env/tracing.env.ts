import { registerAs } from '@nestjs/config';

import { validateEnv } from '@/shared/utils';

import { TracingConfig } from '../interfaces';
import { TracingValidator } from '../validators';

export const tracingEnv = registerAs<TracingConfig>('tracing', () => {
	validateEnv(process.env, TracingValidator);

	return {
		url: process.env.TRACING_URL,
	};
});
