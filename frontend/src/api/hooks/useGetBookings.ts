import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import type { GetUserBookingsResponse } from '../generated'
import { getUserBookings } from '../requests'

export const useGetBookings = (
	options?: Omit<
		UseQueryOptions<unknown, unknown, GetUserBookingsResponse[]>,
		'queryKey' | 'queryFn'
	>
) =>
	useQuery({
		queryKey: ['get bookings'],
		queryFn: getUserBookings,
		...options
	})
