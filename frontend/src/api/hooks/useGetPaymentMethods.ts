import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

import type { GetUserPaymentMethodsResponse } from '../generated'
import { getPaymentMethods } from '../requests'

export const useGetPaymentMethods = (
	options?: Omit<
		UseQueryOptions<unknown, unknown, GetUserPaymentMethodsResponse[]>,
		'queryKey' | 'queryFn'
	>
) =>
	useQuery({
		queryKey: ['get payment methods'],
		queryFn: getPaymentMethods,
		...options
	})
