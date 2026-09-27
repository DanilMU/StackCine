import { useMutation, type UseMutationOptions } from '@tanstack/react-query'

import type { SendOtpRequest, SendOtpResponse } from '../generated'
import { sendOtpCode } from '../requests'

export const useSendOtpCode = (
	options?: Omit<
		UseMutationOptions<SendOtpResponse, unknown, SendOtpRequest>,
		'mutationKey' | 'mutationFn'
	>
) =>
	useMutation({
		mutationKey: ['send otp code'],
		mutationFn: sendOtpCode,
		...options
	})
