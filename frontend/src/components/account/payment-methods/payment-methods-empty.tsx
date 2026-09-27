import { CreditCardIcon, PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaymentMethodsEmptyProps {
	onAdd: () => void
}

export function PaymentMethodsEmpty({ onAdd }: PaymentMethodsEmptyProps) {
	return (
		<div className='flex flex-col items-center justify-center py-5 text-center'>
			<div className='size-16 rounded-full bg-[#2A2C34] flex items-center justify-center mb-4'>
				<CreditCardIcon className='size-8 text-neutral-400' />
			</div>

			<h2 className='text-xl font-semibold mb-2'>Нет привязанных карт</h2>

			<p className='text-sm text-neutral-400 mb-6 max-w-xs'>
				Добавьте банковскую карту, чтобы безопасно оплачивать
				бронирования.
			</p>

			<Button onClick={onAdd} className='gap-2'>
				<PlusIcon className='size-4' /> Добавить карту
			</Button>
		</div>
	)
}
