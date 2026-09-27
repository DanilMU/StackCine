import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { removePaymentMethod } from '../requests'

export const useRemovePaymentMethod = (
	options?: Omit<
		UseMutationOptions<unknown, unknown, unknown>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['remove payment method'],
		mutationFn: removePaymentMethod,
		...options
	})
