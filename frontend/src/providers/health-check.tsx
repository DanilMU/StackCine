'use client'

import { ConstructionIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { useGetHealthStatus } from '@/api/hooks'
import { EllipsisLoader } from '@/components/ellipsis-loader'

interface HealthCheckProvider {
	children: ReactNode
}

export function HealthCheckProvider({ children }: HealthCheckProvider) {
	const { data, isLoading, isError } = useGetHealthStatus({
		retry: 0,
		refetchOnWindowFocus: false
	})

	if (isLoading)
		return (
			<div className='flex h-screen w-full items-center justify-center'>
				<EllipsisLoader />
			</div>
		)

	if (isError || data?.status?.toLowerCase() !== 'ok')
		return (
			<div className='flex h-screen w-full flex-col items-center justify-center p-4 text-center'>
				<ConstructionIcon className='mb-6 size-14 text-rose-500' />
				<h1 className='mb-4 text-3xl font-bold'>
					Сервис временно недоступен
				</h1>
				<p className='max-w-sm text-center text-neutral-400'>
					Мы уже работаем над восстановлением работы сервиса.
					Попробуйте зайти позже.
				</p>
			</div>
		)

	return <>{children}</>
}
