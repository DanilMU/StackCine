import type { Metadata } from 'next'

import { getAllCategories, getAllMovies } from '@/api/requests'
import { MovieList } from '@/components/movies/movie-list'

type Props = {
	searchParams: Promise<{ [key: string]: string | undefined }>
}

export const metadata: Metadata = {
	title: 'Фильмы'
}

export default async function MoviesPage({ searchParams }: Props) {
	const { category } = await searchParams

	const movies = await getAllMovies({ category: category ?? 'now' })
	const categories = await getAllCategories()

	return (
		<MovieList
			movies={movies}
			categories={categories}
			activeCategory={category ?? 'now'}
		/>
	)
}
