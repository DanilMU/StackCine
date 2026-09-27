'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { XIcon } from 'lucide-react'
import { Unbounded } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { VideoPlayer } from '../video-player'

interface Slide {
	id: string | number
	title: string
	subtitle?: string
	slug?: string
	banner: string
	trailer?: string
	description?: string
	link?: string
	isCustom?: boolean
}

interface HeroBannerProps {
	slides: Slide[]
}

const font = Unbounded({
	subsets: ['cyrillic']
})

export function HeroBanner({ slides }: HeroBannerProps) {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [isTrailerOpen, setIsTrailerOpen] = useState(false)

	useEffect(() => {
		if (isTrailerOpen) return

		const timer = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % slides.length)
		}, 10000)

		return () => clearInterval(timer)
	}, [slides.length, isTrailerOpen])

	const nextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % slides.length)
	}

	const prevSlide = () => {
		setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
	}

	const slideVariants = {
		enter: { opacity: 0 },
		center: { opacity: 1 },
		exit: { opacity: 0 }
	}

	const current = slides[currentSlide]

	return (
		<section className='relative h-screen overflow-hidden'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={currentSlide}
					variants={slideVariants}
					initial='enter'
					animate='center'
					exit='exit'
					transition={{ duration: 0.3 }}
					className='absolute inset-0'
				>
					<Image
						src={`/images/banners/${current.banner}`}
						alt={current.title}
						className='h-full w-full object-cover object-center'
						fill
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent' />
					<div className='absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-black/80 via-black/50 to-transparent' />
				</motion.div>
			</AnimatePresence>

			<button
				onClick={prevSlide}
				className='absolute top-1/2 left-6 z-30 flex h-12 w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/50'
			>
				<svg
					className='h-6 w-6'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M15 19l-7-7 7-7'
					/>
				</svg>
			</button>

			<button
				onClick={nextSlide}
				className='absolute top-1/2 right-6 z-30 flex h-12 w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/50'
			>
				<svg
					className='h-6 w-6'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M9 5l7 7-7 7'
					/>
				</svg>
			</button>

			<div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-3/5 bg-gradient-to-r from-black/70 via-black/30 to-transparent' />

			<div className='relative z-20 flex h-full items-center'>
				<div className='mx-auto w-full max-w-7xl px-6'>
					<div className='fade-in-up max-w-3xl'>
						<p className='text-accent mb-4 text-lg font-semibold tracking-wide uppercase'>
							{current.subtitle}
						</p>
						<h1
							className={cn(
								'text-foreground mb-6 text-6xl leading-tight font-bold tracking-wide md:text-7xl',
								font.className
							)}
						>
							{current.title}
						</h1>
						<p className='text-muted-foreground mb-8 max-w-2xl text-xl leading-relaxed font-light'>
							{current.description ??
								'Испытайте кино как никогда прежде. Забронируйте билеты на самые ожидаемые фильмы года.'}
						</p>
						<div className='flex flex-col gap-4 sm:flex-row'>
							<Button>
								<Link href={`/movies/${current.slug}`}>
									За билетами
								</Link>
							</Button>
							{current.trailer && (
								<Button
									variant='outline'
									onClick={() => setIsTrailerOpen(true)}
								>
									Трейлер
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className='absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform space-x-3'>
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`h-3 w-3 cursor-pointer rounded-full transition-all duration-300 ${
							index === currentSlide
								? 'cinema-glow bg-rose-700'
								: 'bg-neutral-200/60'
						}`}
					/>
				))}
			</div>

			<AnimatePresence>
				{isTrailerOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
						onClick={() => setIsTrailerOpen(false)}
					>
						<button
							onClick={() => setIsTrailerOpen(false)}
							className='absolute top-6 right-6 z-50 cursor-pointer text-white transition hover:text-rose-500'
						>
							<XIcon className='size-7' />
						</button>

						<div
							className='relative mx-4 w-full max-w-6xl'
							onClick={e => e.stopPropagation()}
						>
							<VideoPlayer
								src={
									current.trailer
										? `/trailers/${current.trailer}`
										: ''
								}
							/>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	)
}
