import { getAllMovies } from '@/api/requests'
import { HeroBanner } from '@/components/home/hero-banner'
import { MovieGrid } from '@/components/home/movie-grid'

export default async function HomePage() {
	const movies = await getAllMovies({
		category: 'now',
		limit: 6,
		random: true
	})

	const slides = [
		{
			id: 'hollywood',
			title: 'Голливудские блокбастеры',
			subtitle: 'Лучшие премьеры',
			description:
				'Погрузись в мир громких премьер и захватывающих историй.',
			banner: 'hollywood-banner.webp',
			trailer: 'main-trailer.mp4',
			slug: '',
			isCustom: true
		},
		{
			id: 'racing',
			title: 'Гоночные хиты',
			subtitle: 'Ретроспектива скорости',
			description:
				'От ревущих моторов до предельной скорости — почувствуй драйв на полную катушку!',
			banner: 'racing-banner.webp',
			slug: '?category=racing',
			isCustom: true
		},
		{
			id: 'classic',
			title: 'Классика кино',
			subtitle: 'Легенды большого экрана',
			description:
				'От культовых драм до вечной комедии — пересмотри фильмы, вошедшие в историю.',
			banner: 'classic-cinema-banner.webp',
			slug: '?category=classic',
			isCustom: true
		}
	]

	return (
		<div className='flex-1'>
			<HeroBanner slides={slides} />
			<MovieGrid movies={movies} />
		</div>
	)
}
