import { api } from '../instance'

export const getAllCategories = async () =>
	await api.get('/categories').then(response => {
		return response.data
	})
