import { InferInsertModel } from 'drizzle-orm';

import { categories } from '../../drizzle/schema';

export type CategoryFixture = InferInsertModel<typeof categories>;

export const CATEGORIES_DATA = [
	{
		title: 'Классика кино',
		slug: 'classic',
	},
	{
		title: 'Гоночные фильмы',
		slug: 'racing',
	},
	{
		title: 'Кино Балабанова',
		slug: 'balabanov',
	},
	{
		title: 'Драма',
		slug: 'drama',
	},
	{
		title: 'Фантастика',
		slug: 'sci-fi',
	},
	{
		title: 'Боевики',
		slug: 'action',
	},
	{
		title: 'Криминал',
		slug: 'crime',
	},
	{
		title: 'Ужасы и триллеры',
		slug: 'horror',
	},
	{
		title: 'Комедии',
		slug: 'comedy',
	},
	{
		title: 'Военное кино',
		slug: 'war',
	},
	{
		title: 'Мультфильмы',
		slug: 'cartoons',
	},
];
