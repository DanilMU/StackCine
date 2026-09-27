import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { initTelegram } from '../requests'

export const useInitTelegram = (
	options?: Omit<
		UseMutationOptions<any, unknown, unknown>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['init telegram'],
		mutationFn: initTelegram,
		...options
	})
