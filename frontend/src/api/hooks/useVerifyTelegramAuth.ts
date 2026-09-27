import { useMutation, UseMutationOptions } from '@tanstack/react-query'

import type {
	TelegramVerifyRequest,
	TelegramVerifyResponse
} from '../generated'
import { verifyTelegramAuth } from '../requests/auth'

export const useVerifyTelegramAuth = (
	options?: Omit<
		UseMutationOptions<
			TelegramVerifyResponse,
			unknown,
			TelegramVerifyRequest
		>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['verify telegram auth'],
		mutationFn: verifyTelegramAuth,
		...options
	})
