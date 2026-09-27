'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useVerifyTelegramAuth } from '@/api/hooks/useVerifyTelegramAuth'
import { LoaderIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { setCookie } from '@/lib/cookies'

export default function TelegramCallbackPage() {
	const router = useRouter()

	const { mutate, isPending, isError } = useVerifyTelegramAuth({
		onSuccess(data) {
			if (data.accessToken) {
				setCookie('accessToken', data.accessToken)
				router.push(ROUTES.ACCOUNT.ROOT)
				return
			}

			if (data.url) {
				router.push(data.url)
				return
			}
		},
	})

	useEffect(() => {
		const hash = window.location.hash
		const params = new URLSearchParams(hash.slice(1))

		const result = params.get('tgAuthResult')

		if (!result) {
			router.push(ROUTES.AUTH.LOGIN)
			return
		}

		mutate({ tgAuthResult: result })
	}, [])

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-[#0A0C14] text-white p-8'>
			{isPending && (
				<>
					<LoaderIcon className='animate-spin size-14 mb-6' />
					<h1 className='text-3xl font-bold mb-4'>
						Вход через Telegram…
					</h1>
					<p className='text-neutral-400 text-center max-w-sm'>
						Подождите пару секунд.
					</p>
				</>
			)}

			{isError && (
				<>
					<div className='text-6xl mb-6'>❌</div>
					<h1 className='text-3xl font-bold mb-4'>Ошибка входа</h1>
					<p className='text-neutral-400 text-center max-w-sm mb-6'>
						Не удалось авторизоваться через Telegram.
					</p>

					<Button onClick={() => router.push(ROUTES.AUTH.LOGIN)}>
						Вернуться назад
					</Button>
				</>
			)}
		</div>
	)
}
