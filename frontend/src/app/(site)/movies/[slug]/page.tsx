import type { Metadata } from 'next'

import {
	getAllMovies,
	getMovieBySlug,
	getMovieScreenings
} from '@/api/requests'
import { MovieBanner } from '@/components/movies/single/movie-banner'
import { ScheduleSection } from '@/components/movies/single/schedule-section'
import { groupScreeningsByTheater, Theater } from '@/lib/utils'

type Props = {
	params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
	const data = await getAllMovies()

	return data.map(movie => ({
		slug: movie.slug
	}))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params

	const movie = await getMovieBySlug(slug)

	return {
		title: movie.title,
		description: movie.description
	}
}

export default async function MoviePage({ params }: Props) {
	const { slug } = await params

	const movie = await getMovieBySlug(slug)
	const screenings = await getMovieScreenings(movie.id)

	const groupedByTheater: Theater[] = groupScreeningsByTheater(screenings)

	return (
		<div className='mx-auto max-w-7xl px-6 pt-20'>
			<MovieBanner movie={movie} />
			{screenings && <ScheduleSection theaters={groupedByTheater} />}
		</div>
	)
}
