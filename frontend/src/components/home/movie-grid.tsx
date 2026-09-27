import Link from 'next/link'
import { Button } from '../ui/button'
import { MovieCard } from '../movie-card'

export function MovieGrid({ movies }: { movies: any[] }) {
	return (
		<section className='py-20 bg-background'>
			<div className='max-w-7xl mx-auto px-6'>
				<div className='text-center mb-14'>
					<h2 className='text-4xl font-semibold text-foreground mb-3'>
						Уже в кино
					</h2>
					<p className='text-lg font-medium text-zinc-400 max-w-2xl mx-auto'>
						Смотрите новинки на больших экранах прямо сейчас
					</p>
				</div>

				<div className='grid grid-cols-6 gap-6'>
					{movies.slice(0, 6).map((movie, index) => (
						<MovieCard key={index} movie={movie} />
					))}
				</div>

				<div className='mt-10 flex justify-center'>
					<Button variant='secondary'>
						<Link href='/movies'>Все фильмы</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
