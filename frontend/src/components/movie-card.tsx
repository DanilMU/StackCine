'use client'

import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import type { GetAllMoviesResponse } from '@/api/generated'
import { formatReleaseDate, getMediaSource } from '@/lib/utils'

interface MovieCardProps {
	movie: GetAllMoviesResponse
	isShowReleaseDate?: boolean
}

export function MovieCard({
	movie,
	isShowReleaseDate = false
}: MovieCardProps) {
	const [isError, setIsError] = useState(false)

	return (
		<div className='group cursor-pointer'>
			<Link
				href={`/movies/${movie.slug}`}
				className='relative block overflow-hidden rounded-xl'
			>
				<div className='relative aspect-[2/3] w-full'>
					{isError ? (
						<div className='flex h-full w-full items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm'>
							<ImageOff className='h-12 w-12 text-zinc-400' />
						</div>
					) : (
						<Image
							src={getMediaSource(movie.poster)}
							alt={movie.title}
							fill
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
							className='object-cover transition-transform duration-300 group-hover:scale-105'
							onError={() => setIsError(true)}
							priority={false}
						/>
					)}
				</div>

				{!isError && (
					<div className='pointer-events-none absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black/70 to-transparent' />
				)}

				<div className='absolute bottom-3 left-3 flex items-center gap-x-2'>
					<span className='rounded-md bg-white px-2 py-1 text-xs font-medium text-black backdrop-blur-sm'>
						{movie.ratingAge}+
					</span>

					{isShowReleaseDate && movie.releaseDate && (
						<span className='rounded-md bg-rose-700 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm'>
							{formatReleaseDate(movie.releaseDate)}
						</span>
					)}
				</div>
			</Link>

			<div className='mt-3'>
				<h3 className='text-foreground group-hover:text-primary text-[17px] leading-tight font-medium transition-colors'>
					{movie.title}
				</h3>
			</div>
		</div>
	)
}
