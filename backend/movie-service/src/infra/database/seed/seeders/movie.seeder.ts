import { Injectable, Logger } from '@nestjs/common';
import type { InferInsertModel } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

import { movies } from '../../drizzle/schema';
import type { DrizzleTransaction, ISeeder, SeedContext } from '../contracts';
import { MOVIES_DATA } from '../data/movies.data';

type MovieInsert = InferInsertModel<typeof movies>;

@Injectable()
export class MovieSeeder implements ISeeder {
	public readonly name = 'MovieSeeder';
	public readonly order = 2;
	private readonly logger = new Logger(MovieSeeder.name);

	public async wipe(tx: DrizzleTransaction): Promise<void> {
		this.logger.warn('Wiping movies table...');
		await tx.execute(
			sql`TRUNCATE TABLE ${movies} RESTART IDENTITY CASCADE;`,
		);
	}

	public async run(
		tx: DrizzleTransaction,
		context: SeedContext,
	): Promise<void> {
		this.logger.log(`Preparing ${MOVIES_DATA.length} movies...`);

		const recordsToInsert: MovieInsert[] = MOVIES_DATA.map(
			(fixture) => {
				const categoryId = context.getId<string>(
					'categories',
					fixture.categorySlug,
				);

				if (!categoryId) {
					throw new Error(
						`[MovieSeeder] Foreign Key resolution failed: Category with slug "${fixture.categorySlug}" not found in context!`,
					);
				}

				return {
					title: fixture.title,
					slug: fixture.slug,
					description: fixture.description,
					poster: fixture.poster,
					banner: fixture.banner,
					duration: fixture.duration,
					releaseDate: fixture.releaseDate,
					releaseYear: fixture.releaseYear,
					ratingAge: fixture.ratingAge,
					country: fixture.country,
					categoryId,
				};
			},
		);

		const inserted = await tx
			.insert(movies)
			.values(recordsToInsert)
			.onConflictDoUpdate({
				target: movies.slug,
				set: {
					title: sql`excluded.title`,
					description: sql`excluded.description`,
					poster: sql`excluded.poster`,
					banner: sql`excluded.banner`,
					duration: sql`excluded.duration`,
					releaseDate: sql`excluded.release_date`,
					releaseYear: sql`excluded.release_year`,
					ratingAge: sql`excluded.rating_age`,
					country: sql`excluded.country`,
					categoryId: sql`excluded.category_id`,
					updatedAt: sql`now()`,
				},
			})
			.returning({ id: movies.id, slug: movies.slug });

		for (const movie of inserted) {
			if (movie.slug) {
				context.setMapping('movies', movie.slug, movie.id);
			}
		}

		this.logger.log(`✅ Movies seeded (${inserted.length} records)`);
	}
}
