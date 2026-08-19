import { pgTable, varchar } from 'drizzle-orm/pg-core';

import { baseColums } from './common.schema';

export const categories = pgTable('categories', {
	...baseColums,
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).unique(),
});
