'use client'

import { Check } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, id, checked, className, ...props }, ref) => {
		return (
			<label
				htmlFor={id}
				className='flex cursor-pointer items-center gap-3 text-sm select-none'
			>
				<div
					className={cn(
						'flex h-5 w-5 items-center justify-center rounded border transition-all duration-200',
						checked
							? 'border-rose-700 bg-rose-700 hover:bg-rose-800'
							: 'border-neutral-500 bg-transparent hover:border-white/70',
						className
					)}
				>
					<input
						ref={ref}
						id={id}
						type='checkbox'
						checked={checked}
						className='sr-only'
						{...props}
					/>

					{checked && (
						<Check
							className='h-3.5 w-3.5 text-white'
							strokeWidth={3}
						/>
					)}
				</div>

				{label && <span>{label}</span>}
			</label>
		)
	}
)

Checkbox.displayName = 'Checkbox'
