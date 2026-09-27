'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { api } from '@/api/instance'
import { ROUTES } from '@/constants/routes'
import { setCookie } from '@/lib/cookies'

export default function TelegramFinalizePage() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const accessToken = searchParams.get('token')
	const refreshToken = searchParams.get('refresh')

	useEffect(() => {
		if (!accessToken || !refreshToken) {
			router.push(ROUTES.AUTH.LOGIN)
			return
		}

		api.post('/auth/telegram/finalize', {
			accessToken,
			refreshToken,
		}).then(() => {
			setCookie('accessToken', accessToken)
			router.push(ROUTES.ACCOUNT.ROOT)
		})
	}, [])

	return (
		<div className='flex items-center justify-center min-h-screen text-white'>
			Завершаем вход через Telegram…
		</div>
	)
}
