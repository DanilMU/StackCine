'use client'

import { Loader2Icon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function VideoPlayer({
	src,
	poster = '',
	autoPlay = true,
	loop = false
}: {
	src: string
	poster?: string
	autoPlay?: boolean
	loop?: boolean
}) {
	const [isLoading, setIsLoading] = useState(true)
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const handleCanPlay = () => {
			setIsLoading(false)
			if (autoPlay) {
				video.play().catch(() => {
					console.log('Autoplay заблокирован')
				})
			}
		}

		video.addEventListener('canplay', handleCanPlay)

		return () => {
			video.removeEventListener('canplay', handleCanPlay)
		}
	}, [autoPlay, src])

	return (
		<div className='relative h-0 w-full overflow-hidden rounded-2xl bg-black pb-[56.25%]'>
			{isLoading && (
				<div className='absolute inset-0 z-10 flex items-center justify-center'>
					<Loader2Icon className='h-10 w-10 animate-spin text-neutral-400' />
				</div>
			)}

			<video
				ref={videoRef}
				src={src}
				poster={poster}
				className='absolute top-0 left-0 h-full w-full object-cover'
				autoPlay={autoPlay}
				loop={loop}
				controls
			/>
		</div>
	)
}
