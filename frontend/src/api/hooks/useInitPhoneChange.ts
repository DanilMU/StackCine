import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import type { InitPhoneChangeRequest } from '../generated'
import { initPhoneChange } from '../requests'

export const useInitPhoneChange = (
	options?: Omit<
		UseMutationOptions<unknown, unknown, InitPhoneChangeRequest>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['init phone change'],
		mutationFn: initPhoneChange,
		...options
	})
