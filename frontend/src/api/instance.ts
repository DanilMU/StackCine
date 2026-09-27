import type { CreateAxiosDefaults } from 'axios'
import axios from 'axios'

import { deleteCookie, getCookie, setCookie } from '@/lib/cookies'

import { refresh } from './requests'

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const api = axios.create(options)
const instance = axios.create(options)

let isRefreshing = false
let failedQueue: any[] = []

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})
	failedQueue = []
}

instance.interceptors.request.use(config => {
	const accessToken = getCookie('accessToken')

	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	res => res,
	async err => {
		const originalRequest = err.config

		if (
			err?.response?.status === 401 ||
			(err?.response?.status === 500 && !originalRequest._isRetry)
		) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then(token => {
						originalRequest.headers.Authorization = `Bearer ${token}`
						return instance(originalRequest)
					})
					.catch(error => Promise.reject(error))
			}

			originalRequest._isRetry = true
			isRefreshing = true

			try {
				const response = await refresh()

				const newToken = response.accessToken

				if (!newToken) throw new Error('No access token in refresh')

				setCookie('accessToken', newToken)

				instance.defaults.headers.Authorization = `Bearer ${newToken}`
				processQueue(null, newToken)

				return instance(originalRequest)
			} catch (refreshError) {
				processQueue(refreshError, null)
				deleteCookie('accessToken')

				// if (typeof window !== 'undefined')
				// 	window.location.href = '/auth/login'

				return Promise.reject(refreshError)
			} finally {
				isRefreshing = false
			}
		}

		return Promise.reject(err)
	}
)

export { api, instance }
