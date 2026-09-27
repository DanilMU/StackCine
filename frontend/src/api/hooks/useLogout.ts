import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import { logout } from '../requests'

export const useLogout = (
	options?: Omit<
		UseMutationOptions<unknown, unknown>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['logout'],
		mutationFn: logout,
		...options
	})
