import { PaymentMethodItem } from './payment-method-item'
import type { PaymentMethodItemResponse } from '@/api/generated'

interface Props {
	cards: PaymentMethodItemResponse[]
	onDelete: (card: PaymentMethodItemResponse) => void
}

export function PaymentMethodsList({ cards, onDelete }: Props) {
	return (
		<div className='flex flex-col divide-y divide-gray-800'>
			{cards.map((card) => (
				<PaymentMethodItem
					key={card.id}
					card={card}
					onDelete={() => onDelete(card)}
				/>
			))}
		</div>
	)
}
