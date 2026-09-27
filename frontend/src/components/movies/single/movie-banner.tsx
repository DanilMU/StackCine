'use client'

import type { GetAllMoviesResponse } from '@/api/generated'
import { getMediaSource } from '@/lib/utils'

interface MovieBannerProps {
	movie: GetAllMoviesResponse
}

export function MovieBanner({ movie }: MovieBannerProps) {
	return (
		<div
			className='relative h-[320px] w-full overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat'
			style={{ backgroundImage: `url(${getMediaSource(movie.banner)})` }}
		>
			<div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10' />
			<div className='relative z-10 flex h-full'>
				<div className='container mx-auto flex flex-col justify-center px-12'>
					<div className='max-w-2xl'>
						<h1 className='mb-4 text-4xl leading-tight font-bold tracking-tight text-white md:text-[55px]'>
							{movie.title}
						</h1>
					</div>
				</div>
			</div>
		</div>
	)
}
