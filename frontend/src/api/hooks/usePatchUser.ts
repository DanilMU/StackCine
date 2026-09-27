import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import type { PatchUserRequest } from '../generated'
import { patchUser } from '../requests'

export const usePatchUser = (
	options?: Omit<
		UseMutationOptions<unknown, unknown, PatchUserRequest>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['patch user'],
		mutationFn: patchUser,
		...options
	})
