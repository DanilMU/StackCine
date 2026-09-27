import type { HealthResponse } from '../generated'
import { instance } from '../instance'

export const getHealthStatus = () =>
	instance.get<HealthResponse>('/health').then(res => res.data)
