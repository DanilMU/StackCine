import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import type { CreatePaymentMethodResponse } from '../generated'
import { createPaymentMethod } from '../requests'

export const useCreatePaymentMethod = (
	options?: Omit<
		UseMutationOptions<CreatePaymentMethodResponse, unknown, void>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['create payment method'],
		mutationFn: createPaymentMethod,
		...options
	})
