'use client'

import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TicketsCallbackPage() {
	const router = useRouter()
	const [state, setState] = useState<'loading' | 'success'>('loading')

	useEffect(() => {
		const timer = setTimeout(() => {
			setState('success')
			setTimeout(() => router.replace('/account/tickets'), 2000)
		}, 1500)

		return () => clearTimeout(timer)
	}, [router])

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-[#0A0C14] text-white p-8'>
			{state === 'loading' && (
				<>
					<LoaderIcon className='animate-spin size-14 mb-6' />
					<h1 className='text-3xl font-bold mb-4'>
						Обрабатываем оплату…
					</h1>
					<p className='text-neutral-400 text-center max-w-sm'>
						Платёж подтверждается. Это займет несколько секунд.
					</p>
				</>
			)}

			{state === 'success' && (
				<>
					<div className='text-6xl mb-6'>✅</div>
					<h1 className='text-3xl font-bold mb-4'>
						Оплата прошла успешно!
					</h1>
					<p className='text-neutral-400 text-center max-w-sm'>
						Ваши билеты готовы. Вы будете перенаправлены…
					</p>
				</>
			)}
		</div>
	)
}
