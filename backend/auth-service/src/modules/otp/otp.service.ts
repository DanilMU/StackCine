import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { RpcStatus } from '@stackcine/common';
import { createHash } from 'crypto';
import { PinoLogger } from 'nestjs-pino';
import { generateCode } from 'patcode';

import { RedisService } from '@/infrastructure/redis/redis.service';

@Injectable()
export class OtpService {
	public constructor(
		private readonly logger: PinoLogger,
		private readonly redisService: RedisService,
	) {
		this.logger.setContext(OtpService.name);
	}

	public async send(identifier: string, type: 'phone' | 'email') {
		const { code, hash } = this.generateCode();

		this.logger.debug(
			`OTP generated for ${identifier}: ${code}, hash=${hash}`,
		);

		await this.redisService.set(
			`otp:${type}:${identifier}`,
			hash,
			'EX',
			300,
		);

		this.logger.info(`OTP stored in Redis for ${identifier}`);

		return { code, hash };
	}

	public async verify(
		identifier: string,
		code: string,
		type: 'phone' | 'email',
	) {
		const storedHash = await this.redisService.get(
			`otp:${type}:${identifier}`,
		);

		if (!storedHash) {
			this.logger.warn(`OTP expired or misssing for ${identifier}`);

			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'Invalid or expired code',
			});
		}

		const incomingHash = createHash('sha256')
			.update(code)
			.digest('hex');

		if (storedHash !== incomingHash) {
			this.logger.warn(
				`OTP verification failed for ${identifier}: wrong code`,
			);

			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'Invalid or expired code',
			});
		}

		await this.redisService.del(`otp:${type}:${identifier}`);
	}

	private generateCode() {
		const code = generateCode();
		const hash = createHash('sha256').update(code).digest('hex');

		this.logger.debug(`Generated OTP hash=${hash}`);

		return { code, hash };
	}
}
