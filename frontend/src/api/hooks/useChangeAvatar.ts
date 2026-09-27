import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import { changeAvatar } from '../requests'

export const useChangeAvatar = (
	options?: Omit<
		UseMutationOptions<unknown, unknown, unknown>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['change avatar'],
		mutationFn: changeAvatar,
		...options
	})
