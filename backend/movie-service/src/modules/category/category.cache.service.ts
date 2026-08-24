import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/infra/redis/redis.service';

import { CategoryCacheKeys } from './category.cache.keys';

@Injectable()
export class CategoryCacheService {
	private readonly CACHE_TTL: number;

	public constructor(
		private readonly configService: ConfigService,
		private readonly redisService: RedisService,
	) {
		this.CACHE_TTL = Number(
			this.configService.getOrThrow<number>('CACHE_TTL'),
		);
	}

	public get<T = unknown>(key: string): Promise<T | null> {
		return this.redisService.getJson<T>(key);
	}

	public set(key: string, value: unknown): Promise<void> {
		return this.redisService.setJson(key, value, this.CACHE_TTL);
	}

	public getAll<T = unknown>(): Promise<T | null> {
		return this.get(CategoryCacheKeys.all);
	}

	public setAll(value: unknown): Promise<void> {
		return this.set(CategoryCacheKeys.all, value);
	}
}
