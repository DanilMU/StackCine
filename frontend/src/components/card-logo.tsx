'use client'

import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { cn, getCardLogo } from '@/lib/utils'

interface CardLogoProps {
	brand: string
	style: { bg: string; textColor?: string }
	size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP = {
	sm: {
		container: 'w-16 h-10 p-1.5',
		icon: 'w-6 h-6',
		imgWidth: 36,
		imgHeight: 16
	},
	md: {
		container: 'w-20 h-12 p-2',
		icon: 'w-8 h-8',
		imgWidth: 45,
		imgHeight: 20
	},
	lg: {
		container: 'w-28 h-16 p-3',
		icon: 'w-10 h-10',
		imgWidth: 55,
		imgHeight: 28
	}
}

export function CardLogo({ brand, style, size = 'sm' }: CardLogoProps) {
	const [isError, setIsError] = useState(false)
	const cfg = SIZE_MAP[size]

	return (
		<div
			className={cn(
				'flex items-center justify-center rounded-md',
				cfg.container,
				style.bg
			)}
		>
			{isError ? (
				<ImageOff className={cn(cfg.icon, 'text-zinc-300')} />
			) : (
				<Image
					src={getCardLogo(brand)}
					alt={brand}
					width={cfg.imgWidth}
					height={cfg.imgHeight}
					className='object-contain'
					onError={() => setIsError(true)}
				/>
			)}
		</div>
	)
}
