import type { GetUserPaymentMethodsResponse } from '@/api/generated'
import { CardLogo } from '@/components/card-logo'
import { cn, getCardLabel, getCardStyle } from '@/lib/utils'

interface PaymentMethodItemProps {
	card: GetUserPaymentMethodsResponse
	selected: boolean
	onSelect: () => void
}

export function PaymentMethodItem({
	card,
	selected,
	onSelect
}: PaymentMethodItemProps) {
	const style = getCardStyle(card.brand)

	return (
		<button
			onClick={onSelect}
			className={cn(
				'flex w-full cursor-pointer items-center justify-between rounded-lg border p-3 transition hover:bg-[#2A2C34]',
				selected ? 'border-rose-700 bg-[#2A2C34]' : 'border-gray-800'
			)}
		>
			<div className='flex items-center gap-3'>
				<CardLogo brand={card.brand} style={style} size='sm' />

				<div className='flex flex-col items-start leading-tight'>
					<div className='font-medium'>
						{getCardLabel(card.brand)} •••• {card.last4}
					</div>

					<div className='mt-[2px] text-xs text-neutral-400'>
						{card.bank}
					</div>
				</div>
			</div>
		</button>
	)
}
