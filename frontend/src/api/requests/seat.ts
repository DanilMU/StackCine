import { api } from '../instance'

export const getSeatsByHall = async (id: string, screeningId: string) =>
	await api.get(`/seats/hall/${id}/${screeningId}`).then(res => res.data)
