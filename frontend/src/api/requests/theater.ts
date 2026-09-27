import { api } from '../instance'

export const getAllTheaters = async () =>
	api.get<any[]>(`/theaters`).then(res => res.data)
