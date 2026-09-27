import { Button } from '@/components/ui/button'
import type { Seat } from '.'

interface SeatPickerFooterProps {
	totalPrice: number
	selectedSeats: Seat[]
	onCheckout: () => void
	isLoading: boolean
}

export function SeatPickerFooter({
	totalPrice,
	selectedSeats,
	onCheckout,
	isLoading,
}: SeatPickerFooterProps) {
	return (
		<div className='fixed bottom-0 left-0 w-full bg-[#1A1C24] border-t border-gray-800 py-4 px-6 flex items-center justify-between'>
			<div>
				<p className='text-sm text-neutral-400'>
					Выбрано мест: {selectedSeats.length}
				</p>
				<p className='text-lg font-semibold'>{totalPrice} ₽</p>
			</div>
			<Button
				onClick={onCheckout}
				size='lg'
				className='bg-rose-700 hover:bg-rose-800'
				disabled={isLoading}
			>
				Перейти к оплате
			</Button>
		</div>
	)
}
