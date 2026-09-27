import { GetAllMoviesResponse } from '../generated'
import { api } from '../instance'

export const getAllMovies = async (params?: {
	category?: string
	random?: boolean
	limit?: number
}) =>
	await api
		.get<GetAllMoviesResponse[]>('/movies', {
			params
		})
		.then(response => {
			return response.data
		})

export const getPopularMovies = async () =>
	await api.get<GetAllMoviesResponse[]>('/movies/popular').then(response => {
		return response.data
	})

export const getMovieBySlug = async (slug: string) =>
	await api.get(`/movies/${slug}`).then(response => {
		console.log('RESPONSE: ', response.data)

		return response.data
	})
