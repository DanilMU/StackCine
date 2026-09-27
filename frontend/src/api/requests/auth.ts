import type {
	SendOtpRequest,
	SendOtpResponse,
	TelegramFinalizeRequest,
	TelegramFinalizeResponse,
	TelegramVerifyRequest,
	TelegramVerifyResponse,
	VerifyOtpRequest,
	VerifyOtpResponse
} from '../generated'
import { api } from '../instance'

export const sendOtpCode = (data: SendOtpRequest) =>
	api
		.post<SendOtpResponse>('/auth/otp/send', data)
		.then(response => response.data)

export const verifyOtpCode = (data: VerifyOtpRequest) =>
	api
		.post<VerifyOtpResponse>('/auth/otp/verify', data)
		.then(response => response.data)

export const refresh = () =>
	api.post<VerifyOtpResponse>('/auth/refresh').then(response => response.data)

export const logout = () =>
	api.post('/auth/logout').then(response => response.data)

export const initTelegram = async () =>
	await api.get<any>('/auth/telegram').then(response => response.data)

export const verifyTelegramAuth = async (data: TelegramVerifyRequest) =>
	await api
		.post<TelegramVerifyResponse>('/auth/telegram/verify', data)
		.then(response => response.data)

export const finalizeTelegramAuth = async (data: TelegramFinalizeRequest) =>
	await api
		.post<TelegramFinalizeResponse>('/auth/telegram/finalize', data)
		.then(response => response.data)
