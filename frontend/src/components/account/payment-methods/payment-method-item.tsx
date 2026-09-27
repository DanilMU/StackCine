'use client'

import { Trash2Icon } from 'lucide-react'

import type { PaymentMethodItemResponse } from '@/api/generated'
import { CardLogo } from '@/components/card-logo'
import { Button } from '@/components/ui/button'
import { getCardLabel, getCardStyle } from '@/lib/utils'

interface PaymentMethodItemProps {
	card: PaymentMethodItemResponse
	onDelete: () => void
}

export function PaymentMethodItem({ card, onDelete }: PaymentMethodItemProps) {
	const style = getCardStyle(card.brand)

	return (
		<div className='flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-[#2A2C34]'>
			<div className='flex items-center gap-4'>
				<CardLogo brand={card.brand} style={style} size='md' />

				<div className='leading-tight'>
					<p className='font-medium'>
						{getCardLabel(card.brand)} •••• {card.last4}
					</p>
					<p className='text-sm text-neutral-400'>{card.bank}</p>
				</div>
			</div>

			<Button variant='outline' size='icon' onClick={onDelete}>
				<Trash2Icon className='size-5' />
			</Button>
		</div>
	)
}
