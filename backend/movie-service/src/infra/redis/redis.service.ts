import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService
	extends Redis
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(RedisService.name);

	public constructor(private readonly configService: ConfigService) {
		super({
			username: configService.getOrThrow<string>('REDIS_USER'),
			password: configService.getOrThrow<string>('REDIS_PASSWORD'),
			host: configService.getOrThrow<string>('REDIS_HOST'),
			port: Number(configService.getOrThrow<number>('REDIS_PORT')),
			db: Number(configService.getOrThrow<number>('REDIS_DB')),
			maxRetriesPerRequest: 5,
			enableOfflineQueue: true,
			keepAlive: 30000,
		});
	}

	public async onModuleInit() {
		const start = Date.now();

		this.logger.log('Initializing Redis connection...');

		this.on('connect', () => {
			this.logger.log('Redis connecting...');
		});

		this.on('ready', () => {
			const ms = Date.now() - start;
			this.logger.log(`Redis ready in ${ms}ms`);
		});

		this.on('error', (error) => {
			this.logger.error('Redis error:', {
				error: error.message ?? error,
			});
		});

		this.on('close', () => {
			this.logger.warn('Redis connection closed');
		});

		this.on('reconnecting', (delay) => {
			this.logger.log(`Redis reconnecting in ${delay}ms...`);
		});
	}

	public async onModuleDestroy() {
		this.logger.log('Closing Redis connection...');

		try {
			await this.quit();

			this.logger.log('Redis connection closed successfully');
		} catch (error) {
			this.logger.error('Error closing Redis connection:', error);
		}
	}

	public async getJson<T>(key: string): Promise<T | null> {
		const value = await this.get(key);

		return value ? (JSON.parse(value) as T) : null;
	}

	public async setJson(key: string, value: unknown, ttl?: number) {
		const payload = JSON.stringify(value);

		if (ttl) await this.set(key, payload, 'EX', ttl);
		else await this.set(key, payload);
	}
}
