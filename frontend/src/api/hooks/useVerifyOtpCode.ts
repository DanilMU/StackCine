import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import type { VerifyOtpRequest, VerifyOtpResponse } from '../generated'
import { verifyOtpCode } from '../requests'

export const useVerifyOtpCode = (
	options?: Omit<
		UseMutationOptions<VerifyOtpResponse, unknown, VerifyOtpRequest>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['verify otp code'],
		mutationFn: verifyOtpCode,
		...options
	})
