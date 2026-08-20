import { Inject, Injectable, Logger } from '@nestjs/common';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { DRIZZLE_DB } from '../drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';

import { type ISeeder, SeedContext, type SeedOptions } from './contracts';
import { CategorySeeder, MovieSeeder } from './seeders';

@Injectable()
export class DatabaseSeeder {
	private readonly logger = new Logger(DatabaseSeeder.name);
	private readonly seeders: ISeeder[];

	public constructor(
		@Inject(DRIZZLE_DB)
		private readonly db: NodePgDatabase<typeof schema>,
		categorySeeder: CategorySeeder,
		movieSeeder: MovieSeeder,
	) {
		this.seeders = [categorySeeder, movieSeeder].sort(
			(a, b) => a.order - b.order,
		);
	}

	public async run(options: SeedOptions = {}): Promise<void> {
		const startTime = Date.now();
		this.logger.log('🚀 Starting database seeding workflow...');

		const activeSeeders = this.resolveSeeders(options.target);

		if (activeSeeders.length === 0) {
			this.logger.warn(
				'⚠️ No seeders matched the requested filter.',
			);
			return;
		}

		const context = new SeedContext();

		await this.db.transaction(async (tx) => {
			if (options.fresh) {
				this.logger.warn(
					'⚠️ Fresh mode activated: wiping tables in reverse order...',
				);
				const reverseSeeders = [...activeSeeders].reverse();
				for (const seeder of reverseSeeders) {
					if (seeder.wipe) {
						await seeder.wipe(tx);
					}
				}
			}

			for (const seeder of activeSeeders) {
				const stepTime = Date.now();
				this.logger.log(
					`▶ Executing [${seeder.name}] (Order: ${seeder.order})...`,
				);

				try {
					await seeder.run(tx, context);
					this.logger.log(
						`✔ [${seeder.name}] finished in ${Date.now() - stepTime}ms`,
					);
				} catch (error) {
					this.logger.error(
						`❌ [${seeder.name}] failed! Rolling back transaction.`,
					);
					throw error;
				}
			}
		});

		this.logger.log(
			`✨ All seeders executed successfully in ${Date.now() - startTime}ms!`,
		);
	}

	private resolveSeeders(target?: string[]): ISeeder[] {
		if (!target || target.length === 0) {
			return this.seeders;
		}

		const targetSet = new Set(target.map((t) => t.toLowerCase()));

		return this.seeders.filter((seeder) => {
			const fullName = seeder.name.toLowerCase();
			const shortName = seeder.name
				.replace(/Seeder$/i, '')
				.toLowerCase();

			return targetSet.has(fullName) || targetSet.has(shortName);
		});
	}
}
