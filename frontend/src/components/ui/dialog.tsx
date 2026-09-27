'use client'

import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'

interface DialogProps {
	open: boolean
	onClose: () => void
	title?: string
	children?: ReactNode
	className?: string
	hideCloseButton?: boolean
}

export function Dialog({
	open,
	onClose,
	title,
	children,
	className,
	hideCloseButton = false
}: DialogProps) {
	useEffect(() => {
		if (open) document.body.style.overflow = 'hidden'
		else document.body.style.overflow = ''

		return () => {
			document.body.style.overflow = ''
		}
	}, [open])

	if (!open) return null

	return createPortal(
		<div
			className='animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm'
			onClick={onClose}
		>
			<div
				className={cn(
					'animate-scaleIn w-full max-w-md rounded-xl bg-[#1A1C24] p-6 text-white shadow-xl',
					className
				)}
				onClick={e => e.stopPropagation()}
			>
				<div className='mb-4 flex items-center justify-between'>
					{title && (
						<h2 className='text-xl font-semibold'>{title}</h2>
					)}
					{/* {!hideCloseButton && (
						<button
							onClick={onClose}
							className='text-neutral-400 hover:text-white transition text-sm'
						>
							Закрыть
						</button>
					)} */}
				</div>

				{children}
			</div>
		</div>,
		document.body
	)
}
