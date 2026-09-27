import { instance } from '../instance'

export const createRefund = (data: { bookingId: string }) =>
	instance.post('/refunds', data).then(res => res.data)
