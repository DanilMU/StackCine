import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import type { GetMeResponse } from '../generated'
import { getMe } from '../requests'

export const useGetMe = (
	options?: Omit<
		UseQueryOptions<unknown, unknown, GetMeResponse>,
		'queryKey' | 'queryFn'
	>
) =>
	useQuery({
		queryKey: ['get me'],
		queryFn: getMe,
		...options
	})
