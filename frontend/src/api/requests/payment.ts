import type {
	GetUserPaymentMethodsResponse,
	InitPaymentRequest
} from '../generated'
import { instance } from '../instance'

export const initPayment = (data: InitPaymentRequest) =>
	instance.post('/payment/init', data).then(res => res.data)

export const getPaymentMethods = async () =>
	await instance
		.get<GetUserPaymentMethodsResponse[]>('/payment/methods')
		.then(res => res.data)

export const createPaymentMethod = () =>
	instance.post<{ url: string }>('/payment/methods').then(res => res.data)

export const verifyPaymentMethod = (params: { methodId: string }) =>
	instance
		.post(
			'/payment/methods/verify',
			{},
			{
				params: {
					payment_method_id: params.methodId
				}
			}
		)
		.then(res => res.data)

export const removePaymentMethod = (id: string) =>
	instance.delete(`/payment/methods/${id}`).then(res => res.data)
