'use client'

import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '@/lib/utils'

interface SheetProps {
	open: boolean
	onClose: () => void
	side?: 'left' | 'right' | 'top' | 'bottom'
	children: ReactNode
	className?: string
}

export function Sheet({
	open,
	onClose,
	side = 'right',
	children,
	className
}: SheetProps) {
	useEffect(() => {
		if (open) document.body.style.overflow = 'hidden'
		else document.body.style.overflow = ''
		return () => {
			document.body.style.overflow = ''
		}
	}, [open])

	if (!open) return null

	const positionClasses = {
		right: 'right-0 top-0 h-full w-[400px] animate-slideInRight',
		left: 'left-0 top-0 h-full w-[400px] animate-slideInLeft',
		top: 'top-0 left-0 w-full h-[350px] animate-slideInTop',
		bottom: 'bottom-0 left-0 w-full h-[350px] animate-slideInBottom'
	}

	return createPortal(
		<div
			className='fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm'
			onClick={onClose}
		>
			<div
				className={cn(
					'fixed bg-[#1A1C24] text-white shadow-xl',
					positionClasses[side],
					className
				)}
				onClick={e => e.stopPropagation()}
			>
				<div className='h-full overflow-y-auto p-6'>{children}</div>
			</div>
		</div>,
		document.body
	)
}
