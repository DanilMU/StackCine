import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { verifyPaymentMethod } from '../requests/payment'

interface VerifyMethodRequest {
	methodId: string
}

export const useVerifyPaymentMethod = (
	options?: Omit<
		UseMutationOptions<unknown, unknown, VerifyMethodRequest>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['verify payment method'],
		mutationFn: verifyPaymentMethod,
		...options
	})
