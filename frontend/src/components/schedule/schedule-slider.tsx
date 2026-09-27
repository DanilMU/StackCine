'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback } from 'react'

import { Button } from '@/components/ui/button'
import { getMediaSource } from '@/lib/utils'

export function ScheduleSlider({ theater }: any) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: false,
		dragFree: false,
		slidesToScroll: 1
	})

	const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
	const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

	return (
		<div className='mb-12 shadow-lg'>
			<div className='mb-4 flex items-center justify-between'>
				<div>
					<h2 className='text-2xl font-semibold text-white'>
						{theater.theater.name}
					</h2>
					<p className='text-base text-neutral-400'>
						{theater.theater.address}
					</p>
				</div>

				<div className='flex gap-2'>
					<Button onClick={scrollPrev} variant='outline' size='icon'>
						<ChevronLeftIcon />
					</Button>
					<Button onClick={scrollNext} variant='outline' size='icon'>
						<ChevronRightIcon />
					</Button>
				</div>
			</div>

			<div className='overflow-hidden' ref={emblaRef}>
				<div className='flex gap-4'>
					{theater.screenings.map((s: any) => (
						<div
							key={s.id}
							className='max-w-[320px] min-w-[320px] flex-[0_0_calc(33.333%-0px)]'
						>
							<Link
								href={`/screening/${s.id}`}
								className='group flex h-full cursor-pointer gap-4 rounded-xl bg-[#1A1C24] p-4 transition-colors hover:bg-[#242730]'
							>
								<div className='relative aspect-[2/3] w-[90px] flex-none shrink-0 overflow-hidden rounded-lg bg-black/40'>
									<Image
										src={getMediaSource(s.movie.poster)}
										alt={s.movie.title}
										fill
										className='h-full w-full object-cover duration-300 group-hover:scale-105'
									/>
								</div>

								<div className='flex min-w-0 flex-col justify-between'>
									<div>
										<h3 className='line-clamp-2 text-base font-semibold text-white'>
											{s.movie.title}
										</h3>

										<div className='mt-2 space-x-2 text-sm text-neutral-400'>
											<span className='font-medium text-white'>
												{s.time}
											</span>
											<span>•</span>
											<span>{s.hall}</span>
										</div>
									</div>

									<span className='mt-1 text-sm font-semibold text-rose-500'>
										от {s.price}
									</span>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
