// src/components/schedule/DateSelector.tsx
'use client'

import { addDays, format } from 'date-fns'
import Link from 'next/link'

import { cn } from '@/lib/utils'

interface DateSelectorProps {
	selectedDate: Date
}

export function DateSelector({ selectedDate }: DateSelectorProps) {
	const formattedSelected = format(selectedDate, 'yyyy-MM-dd')
	const dates = Array.from({ length: 7 }).map((_, i) =>
		addDays(new Date(), i)
	)
	const shortDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

	return (
		<div className='mb-10 flex justify-center gap-3 overflow-x-auto pb-4'>
			{dates.map((date, i) => {
				const formatted = format(date, 'yyyy-MM-dd')
				const isActive = formatted === formattedSelected

				return (
					<Link
						key={i}
						href={`/schedule?date=${formatted}`}
						className={cn(
							'flex cursor-pointer flex-col items-center justify-center rounded-xl px-4 py-2 transition-all duration-200',
							isActive
								? 'bg-rose-600 shadow-md'
								: 'bg-[#1A1C24] hover:bg-[#242730]'
						)}
					>
						<span
							className={cn(
								'text-sm font-medium',
								isActive ? 'text-white' : 'text-neutral-400'
							)}
						>
							{shortDays[date.getDay()]}
						</span>
						<span className='text-lg font-semibold text-white'>
							{format(date, 'dd')}
						</span>
					</Link>
				)
			})}
		</div>
	)
}
