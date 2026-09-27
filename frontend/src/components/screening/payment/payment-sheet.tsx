import { Seat } from '..'
import Image from 'next/image'

import { PaymentMethodItemResponse } from '@/api/generated'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

import { PaymentMethods } from './payment-methods'

interface PaymentSheetProps {
	selectedSeats: Seat[]
	totalPrice: number
	paymentMethods: PaymentMethodItemResponse[]
	selectedCard: string | null
	setSelectedCard: (value: string | null) => void
	saveCard: boolean
	setSaveCard: (value: boolean) => void
	isPending: boolean
	onCheckout: () => void
}

export function PaymentSheet({
	selectedSeats,
	totalPrice,
	paymentMethods,
	selectedCard,
	setSelectedCard,
	saveCard,
	setSaveCard,
	isPending,
	onCheckout
}: PaymentSheetProps) {
	return (
		<div className='flex h-full flex-col'>
			<div className='flex-1 overflow-auto'>
				<h2 className='mb-4 text-xl font-semibold'>Ваш заказ</h2>

				<div className='space-y-2'>
					{selectedSeats.map(seat => (
						<div
							key={seat.id}
							className='flex justify-between border-b border-gray-700 pb-2'
						>
							<span>
								Ряд {seat.row}, Место {seat.number}
							</span>
							<span>{seat.price} ₽</span>
						</div>
					))}
				</div>
			</div>

			<div className='mt-4 border-t border-gray-800 pt-4'>
				{paymentMethods.length > 0 && (
					<PaymentMethods
						methods={paymentMethods}
						selectedCard={selectedCard}
						setSelectedCard={setSelectedCard}
						setSaveCard={setSaveCard}
					/>
				)}

				{!selectedCard && (
					<div className='mb-4 flex items-center gap-2'>
						<Checkbox
							label='Сохранить карту для будущих оплат'
							checked={saveCard}
							onChange={e => setSaveCard(e.target.checked)}
						/>
					</div>
				)}

				<div className='mb-4 flex justify-between text-lg font-semibold'>
					<span>Итого:</span>
					<span>{totalPrice} ₽</span>
				</div>

				<Button
					onClick={onCheckout}
					size='lg'
					className='w-full bg-rose-700 hover:bg-rose-800'
					disabled={isPending}
				>
					Оплатить
				</Button>
			</div>
		</div>
	)
}
