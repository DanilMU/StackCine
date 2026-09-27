'use client'

import { addDays, format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Link from 'next/link'
import { useState } from 'react'

import { cn, type Theater } from '@/lib/utils'

interface ScheduleSectionProps {
	theaters: Theater[]
}

const dates = Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i))

export function ScheduleSection({ theaters }: ScheduleSectionProps) {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const formattedDate = format(selectedDate, 'yyyy-MM-dd')

	const filteredTheaters = theaters.filter(
		theater => theater.screenings.length > 0
	)

	return (
		<div className='pt-10 pb-16 text-white'>
			<div className='mb-8 flex gap-3 overflow-x-auto'>
				{dates.map((date, i) => {
					const isActive =
						format(date, 'yyyy-MM-dd') === formattedDate

					const shortDays = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

					return (
						<button
							key={i}
							onClick={() => setSelectedDate(date)}
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
								{format(date, 'dd', { locale: ru })}
							</span>
						</button>
					)
				})}
			</div>

			{filteredTheaters.length > 0 ? (
				<div className='space-y-10'>
					{filteredTheaters.map((theater, index) => (
						<div key={index} className='space-y-4'>
							<div>
								<h2 className='text-xl font-semibold text-white'>
									{theater.name}
								</h2>
								<p className='text-sm text-zinc-400'>
									{theater.address}
								</p>
							</div>

							<div className='flex gap-4 overflow-x-auto pb-2'>
								{theater.screenings.map((screening, index) => (
									<Link
										key={index}
										href={`/screening/${screening.id}`}
										className='flex min-w-[120px] cursor-pointer flex-col items-center justify-center rounded-xl border border-transparent bg-[#1A1C24] p-3 transition-colors hover:border-rose-700 hover:bg-[#242730]'
									>
										<span className='text-lg font-bold text-white'>
											{screening.time}
										</span>
										<span className='text-sm text-neutral-400'>
											{screening.hall}
										</span>
										<span className='mt-1 text-sm font-medium text-rose-700'>
											{screening.price}
										</span>
									</Link>
								))}
							</div>
						</div>
					))}
				</div>
			) : (
				<p className='pt-10 text-center text-lg text-neutral-400'>
					На выбранную дату пока нет сеансов 😔
				</p>
			)}
		</div>
	)
}
