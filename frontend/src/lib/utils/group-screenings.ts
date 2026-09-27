import type { ScreeningResponse } from '@/api/generated'

import { toISO } from './to-iso'

export interface Screening {
	id: string
	time: string | undefined
	hall: string
	price: number
	date: string | null
}

export interface Theater {
	id: string
	name: string
	address: string
	screenings: Screening[]
}

export function groupScreeningsByTheater(
	screenings: ScreeningResponse[]
): Theater[] {
	const grouped = Object.values(
		screenings.reduce((acc: Record<string, Theater>, item) => {
			const theaterId = item.theater.id

			if (!acc[theaterId]) {
				acc[theaterId] = {
					id: item.theater.id,
					name: item.theater.name,
					address: item.theater.address,
					screenings: []
				}
			}

			acc[theaterId].screenings.push({
				id: item.id,
				time: toISO(item.startAt)?.slice(11, 16),
				hall: item.hall.name,
				price: Math.min(...item.seatTypes.map((s: any) => s.price)),
				date: toISO(item.startAt)
			})

			return acc
		}, {})
	)

	return grouped
}
