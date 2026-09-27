'use client'

import { LoaderIcon } from 'lucide-react'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useVerifyPaymentMethod } from '@/api/hooks'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

export default function PaymentMethodCallbackPage() {
	const search = useSearchParams()
	const router = useRouter()

	const methodId = search.get('payment_method_id')

	const { mutate, isPending, isSuccess, isError } = useVerifyPaymentMethod({
		onSuccess: () => {
			setTimeout(() => router.push(ROUTES.ACCOUNT.PAYMENT_METHODS), 1200)
		}
	})

	useEffect(() => {
		if (methodId) mutate({ methodId })
	}, [methodId])

	if (!methodId) return redirect(ROUTES.ACCOUNT.PAYMENT_METHODS)

	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-[#0A0C14] p-8 text-white'>
			{isPending && (
				<>
					<LoaderIcon className='mb-6 size-14 animate-spin' />
					<h1 className='mb-4 text-3xl font-bold'>
						Привязываем карту…
					</h1>
					<p className='max-w-sm text-center text-neutral-400'>
						Пожалуйста, подождите несколько секунд.
					</p>
				</>
			)}

			{isSuccess && (
				<>
					<div className='mb-6 text-6xl'>🎉</div>
					<h1 className='mb-4 text-3xl font-bold'>
						Карта привязана!
					</h1>
					<p className='max-w-sm text-center text-neutral-400'>
						Вы будете перенаправлены через пару секунд.
					</p>
				</>
			)}

			{isError && (
				<>
					<div className='mb-6 text-6xl'>❌</div>
					<h1 className='mb-4 text-3xl font-bold'>
						Не удалось привязать карту
					</h1>
					<p className='mb-6 max-w-sm text-center text-neutral-400'>
						Произошла ошибка. Попробуйте снова или выберите другой
						способ оплаты.
					</p>

					<Button
						variant='outline'
						onClick={() =>
							router.push(ROUTES.ACCOUNT.PAYMENT_METHODS)
						}
					>
						Вернуться к способам оплаты
					</Button>
				</>
			)}
		</div>
	)
}
