'use client'

import { MovieCard } from '@/components/movie-card'
import { Button } from '../ui/button'
import Link from 'next/link'
import { GetAllMoviesResponse } from '@/api/generated'

interface Category {
	id: string
	title: string
	slug: string
	description?: string | null
}

interface MovieListProps {
	movies: GetAllMoviesResponse[]
	categories: Category[]
	activeCategory: string
}

export function MovieList({
	movies,
	categories,
	activeCategory,
}: MovieListProps) {
	const allCategories = [
		{ id: 'now', label: 'Уже в кино' },
		{ id: 'soon', label: 'Скоро' },
		...categories.map((c) => ({ id: c.slug!, label: c.title })),
	]

	return (
		<section className='pt-28 pb-20 bg-background'>
			<div className='max-w-7xl mx-auto px-6'>
				<h1 className='text-5xl text-center font-bold text-white mb-8'>
					Фильмы в Заречном
				</h1>

				<div className='flex justify-center flex-wrap gap-3 mb-8'>
					{allCategories.map((category, index) => (
						<Button
							key={index}
							variant={
								activeCategory === category.id
									? 'default'
									: 'outline'
							}
							size='md'
						>
							<Link href={`/movies?category=${category.id}`}>
								{category.label}
							</Link>
						</Button>
					))}
				</div>

				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6'>
					{movies ? (
						movies.map((movie, index) => (
							<MovieCard
								key={index}
								movie={movie}
								isShowReleaseDate={activeCategory !== 'now'}
							/>
						))
					) : (
						<div></div>
					)}
				</div>
			</div>
		</section>
	)
}
