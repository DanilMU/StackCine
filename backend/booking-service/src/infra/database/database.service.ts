import {
	Inject,
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit,
} from '@nestjs/common';
import type { Sql } from 'postgres';

export const PG = Symbol('PG');

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(DatabaseService.name);

	public constructor(@Inject(PG) private readonly sql: Sql) {}

	public async onModuleInit() {
		const start = Date.now();

		this.logger.log('Connecting to the database...');

		try {
			await this.sql`SELECT 1`;

			const ms = Date.now() - start;

			this.logger.log(`Connected to the database in ${ms}ms`);
		} catch (error) {
			this.logger.error('Failed to connect to the database', error);

			throw error;
		}
	}

	public async onModuleDestroy() {
		this.logger.log('Disconnecting from the database...');

		try {
			await this.sql.end();

			this.logger.log('Disconnected from the database');
		} catch (error) {
			this.logger.error(
				'Failed to disconnect from the database',
				error,
			);

			throw error;
		}
	}

	public query(strings: TemplateStringsArray, ...values: any[]) {
		return this.sql(strings, ...values);
	}

	public raw<T = any>(query: string, params: any[] = []) {
		return this.sql.unsafe<T[]>(query, params);
	}
}
