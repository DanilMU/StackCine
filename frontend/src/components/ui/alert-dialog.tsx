'use client'

import { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AlertDialogProps {
	open: boolean
	onClose: () => void
	onConfirm: () => void
	title?: string
	description?: string
	confirmText?: string
	cancelText?: string
	confirmVariant?: 'default' | 'outline' | 'danger'
	children?: ReactNode
}

export function AlertDialog({
	open,
	onClose,
	onConfirm,
	title = 'Подтверждение',
	description = 'Вы уверены, что хотите выполнить это действие?',
	confirmText = 'Подтвердить',
	cancelText = 'Отмена',
	confirmVariant = 'default',
	children
}: AlertDialogProps) {
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
				className='animate-scaleIn w-full max-w-md space-y-4 rounded-xl bg-[#1A1C24] p-6 text-white shadow-xl'
				onClick={e => e.stopPropagation()}
			>
				{title && <h2 className='text-xl font-semibold'>{title}</h2>}
				{description && (
					<p className='text-sm leading-relaxed text-neutral-400'>
						{description}
					</p>
				)}
				{children}
				<div className='flex justify-end gap-3'>
					<Button
						variant='outline'
						size='md'
						onClick={onClose}
						className='min-w-[100px]'
					>
						{cancelText}
					</Button>
					<Button
						variant={
							confirmVariant === 'danger'
								? 'default'
								: confirmVariant
						}
						size='md'
						className={cn(
							'min-w-[100px]',
							confirmVariant === 'danger'
								? 'bg-red-600 hover:bg-red-700'
								: ''
						)}
						onClick={() => {
							onConfirm()
							onClose()
						}}
					>
						{confirmText}
					</Button>
				</div>
			</div>
		</div>,
		document.body
	)
}
