import { MessageCircleWarningIcon } from 'lucide-react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef } from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	icon?: ReactNode
	error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, id, type = 'text', icon, error, className, ...rest }, ref) => {
		return (
			<div>
				<label
					htmlFor={id}
					className='mb-2 block text-sm font-semibold'
				>
					{label}
				</label>

				<div className='relative'>
					{icon && (
						<div className='absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-zinc-400'>
							{icon}
						</div>
					)}

					<input
						ref={ref}
						id={id}
						type={type}
						className={cn(
							'w-full rounded-md border border-neutral-400 bg-transparent py-3 pr-4 text-white placeholder-neutral-400 transition-colors focus:border-white focus:outline-none',
							icon ? 'pl-12' : 'pl-4',
							className
						)}
						{...rest}
					/>
				</div>

				{error && (
					<div className='mt-2 flex items-center gap-1 text-red-400'>
						<MessageCircleWarningIcon className='size-4' />
						<span className='text-sm font-light'>{error}</span>
					</div>
				)}
			</div>
		)
	}
)

Input.displayName = 'Input'
