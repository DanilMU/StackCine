import type {
	ConfirmEmailChangeRequest,
	ConfirmPhoneChangeRequest,
	InitEmailChangeRequest,
	InitPhoneChangeRequest
} from '../generated'
import { instance } from '../instance'

export const initEmailChange = (data: InitEmailChangeRequest) =>
	instance.post('/account/email/init', data).then(response => response.data)

export const confirmEmailChange = (data: ConfirmEmailChangeRequest) =>
	instance
		.post('/account/email/confirm', data)
		.then(response => response.data)

export const initPhoneChange = (data: InitPhoneChangeRequest) =>
	instance.post('/account/phone/init', data).then(response => response.data)

export const confirmPhoneChange = (data: ConfirmPhoneChangeRequest) =>
	instance
		.post('/account/phone/confirm', data)
		.then(response => response.data)
