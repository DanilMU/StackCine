// components/movies/filter-tabs.tsx
import Link from 'next/link'

import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

interface Filter {
	id: string
	name: string
}

interface FilterTabsProps {
	filters: Filter[]
	activeFilter: string
}

export function FilterTabs({ filters, activeFilter }: FilterTabsProps) {
	return (
		<div className='custom-scrollbar mb-6 flex gap-3 overflow-x-auto pb-2 md:mb-8'>
			{filters.map((filter, index) => {
				const isActive = filter.id === activeFilter

				return (
					<Link
						key={index}
						href={`/movies${
							filter.id ? `?collection=${filter.id}` : ''
						}`}
					>
						<Button variant={isActive ? 'default' : 'outline'}>
							{filter.name}
						</Button>
					</Link>
				)
			})}
		</div>
	)
}
