import { ValidationPipeOptions } from '@nestjs/common';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export function getValidationPipeConfig(): ValidationPipeOptions {
	return {
		transform: true,
		whitelist: true,
	};
}
