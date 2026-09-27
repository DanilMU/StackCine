import type { GetUserBookingsResponse } from '../generated'
import { instance } from '../instance'

export const getUserBookings = async () =>
	await instance
		.get<GetUserBookingsResponse[]>('/bookings/@me')
		.then(res => res.data)
