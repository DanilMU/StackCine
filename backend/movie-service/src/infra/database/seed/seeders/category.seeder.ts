import { Injectable, Logger } from '@nestjs/common';
import { sql } from 'drizzle-orm';

import { categories } from '../../drizzle/schema';
import { DrizzleTransaction, ISeeder, SeedContext } from '../contracts';
import { CATEGORIES_DATA } from '../data';

@Injectable()
export class CategorySeeder implements ISeeder {
	public readonly name = 'CategorySeeder';
	public readonly order = 1;

	private readonly logger = new Logger(CategorySeeder.name);

	public async wipe(tx: DrizzleTransaction): Promise<void> {
		this.logger.warn('Wiping categories table...');
		await tx.execute(
			sql`TRUNCATE TABLE ${categories} RESTART IDENTITY CASCADE;`,
		);
	}

	public async run(
		tx: DrizzleTransaction,
		context: SeedContext,
	): Promise<void> {
		this.logger.log(`Seeding${CATEGORIES_DATA.length} categories...`);

		const inserted = await tx
			.insert(categories)
			.values(CATEGORIES_DATA)
			.onConflictDoUpdate({
				target: categories.slug,
				set: {
					title: sql`excluded.title`,
					updatedAt: sql`now()`,
				},
			})
			.returning({ id: categories.id, slug: categories.slug });

		for (const cat of inserted) {
			if (cat.slug) {
				context.setMapping('categories', cat.slug, cat.id);
			}
		}

		this.logger.log(
			`✅ Categories seeded and indexed into context (${inserted.length} records)`,
		);
	}
}
