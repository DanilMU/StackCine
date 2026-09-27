import type { GetMeResponse, PatchUserRequest } from '../generated'
import { instance } from '../instance'

export const getMe = async () =>
	await instance
		.get<GetMeResponse>('/users/@me')
		.then(response => response.data)

export const patchUser = async (data: PatchUserRequest) =>
	await instance.patch('/users/@me', data).then(response => response.data)

export const changeAvatar = async (file: File) => {
	const formData = new FormData()
	formData.append('file', file)

	return await instance
		.patch('/users/@me/avatar', formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then(response => response.data)
}
