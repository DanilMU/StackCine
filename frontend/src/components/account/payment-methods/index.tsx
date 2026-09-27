'use client'

import { ArrowLeftIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { PaymentMethodItemResponse } from '@/api/generated'
import {
	useCreatePaymentMethod,
	useGetPaymentMethods,
	useRemovePaymentMethod
} from '@/api/hooks'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { getCardLabel } from '@/lib/utils'

import { PaymentMethodsEmpty } from './payment-methods-empty'
import { PaymentMethodsList } from './payment-methods-list'

export function PaymentMethods() {
	const [deleteTarget, setDeleteTarget] =
		useState<PaymentMethodItemResponse | null>(null)

	const router = useRouter()
	const { data, isLoading, refetch } = useGetPaymentMethods()

	const { mutate: create, isPending: isCreating } = useCreatePaymentMethod({
		onSuccess(data) {
			router.push(data.url)
		}
	})

	const { mutate: remove } = useRemovePaymentMethod({
		onSuccess() {
			refetch()
		}
	})

	if (isLoading) return <div>Loading...</div>

	const hasCards = data && data.length > 0

	return (
		<div className='flex min-h-screen justify-center bg-[#0A0C14] py-10 text-white'>
			<div className='w-full max-w-2xl space-y-8'>
				<div className='flex items-center gap-3'>
					<button
						onClick={() => router.push(ROUTES.ACCOUNT.ROOT)}
						className='cursor-pointer p-0'
					>
						<ArrowLeftIcon className='size-5 text-white transition hover:text-rose-700' />
					</button>
					<h2 className='text-2xl font-semibold'>Способы оплаты</h2>
				</div>

				<div className='space-y-4 rounded-xl bg-[#1A1C24] p-6'>
					{hasCards ? (
						<PaymentMethodsList
							cards={data}
							onDelete={card => setDeleteTarget(card)}
						/>
					) : (
						<PaymentMethodsEmpty onAdd={() => create()} />
					)}

					{hasCards && (
						<Button
							variant='outline'
							className='gap-2'
							onClick={() => create()}
							disabled={isCreating}
						>
							<PlusIcon className='size-4' />
							Добавить карту
						</Button>
					)}
				</div>

				<div className='flex items-center gap-3 rounded-xl bg-[#1A1C24] p-5'>
					<p className='text-sm text-gray-400'>
						Данные карт сохраняются в зашифрованном виде. Мы не
						храним CVV-коды и не передаём данные третьим лицам.
					</p>
				</div>
			</div>

			<AlertDialog
				open={!!deleteTarget}
				onClose={() => setDeleteTarget(null)}
				onConfirm={() => deleteTarget && remove(deleteTarget.id)}
				title='Удалить карту?'
				description={
					deleteTarget
						? `Карта ${getCardLabel(deleteTarget.brand)} •••• ${
								deleteTarget.last4
							} будет удалена безвозвратно.`
						: ''
				}
				confirmText='Удалить'
				cancelText='Отмена'
				confirmVariant='danger'
			/>
		</div>
	)
}
