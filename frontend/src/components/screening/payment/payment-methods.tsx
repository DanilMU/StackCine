import type { GetUserPaymentMethodsResponse } from '@/api/generated'

import { PaymentMethodItem } from './payment-method-item'
import { AddNewCardButton } from './add-new-card-button'

interface PaymentMethodsProps {
	methods: GetUserPaymentMethodsResponse[]
	selectedCard: string | null
	setSelectedCard: (value: string | null) => void
	setSaveCard: (value: boolean) => void
}

export function PaymentMethods({
	methods,
	selectedCard,
	setSelectedCard,
	setSaveCard,
}: PaymentMethodsProps) {
	return (
		<div className='space-y-3 mb-4'>
			<p className='text-sm text-neutral-400 mb-2'>Способы оплаты</p>

			{methods.map((card) => (
				<PaymentMethodItem
					key={card.id}
					card={card}
					selected={selectedCard === card.id}
					onSelect={() => {
						setSelectedCard(card.id)
						setSaveCard(false)
					}}
				/>
			))}

			<AddNewCardButton
				active={!selectedCard}
				onClick={() => {
					setSelectedCard(null)
					setSaveCard(true)
				}}
			/>
		</div>
	)
}
