import { relations } from 'drizzle-orm';
import {
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

import { categories } from './categories.schema';
import { baseColums } from './common.schema';

export const movies = pgTable('movies', {
	...baseColums,
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).unique(),
	description: text('description').notNull(),
	poster: text('poster').notNull(),
	banner: text('banner').notNull(),
	duration: integer('duration').default(0).notNull(),
	releaseYear: integer('release_year'),
	releaseDate: timestamp('release_date'),
	ratingAge: integer('rating_age').default(0),
	country: varchar('country', { length: 255 }),
	categoryId: uuid('category_id').references(() => categories.id, {
		onDelete: 'cascade',
	}),
});

export const moviesRelations = relations(movies, ({ one }) => ({
	category: one(categories, {
		fields: [movies.categoryId],
		references: [categories.id],
	}),
}));
