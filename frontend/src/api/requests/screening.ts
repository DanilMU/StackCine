import type {
	GetScreeningResponse,
	GetScreeningsByDateResponse
} from '../generated'
import { api } from '../instance'

export const getScreeningsByDate = async (params: {
	theaterId?: string
	date?: string
}) =>
	api
		.get<GetScreeningsByDateResponse[]>(`/screenings`, {
			params
		})
		.then(res => res.data)

export const getScreeningById = async (id: string) =>
	await api.get<GetScreeningResponse>(`/screenings/${id}`).then(response => {
		return response.data
	})

export const getMovieScreenings = async (movieId: string) =>
	await api.get(`/screenings/movie/${movieId}`).then(response => {
		return response.data
	})
