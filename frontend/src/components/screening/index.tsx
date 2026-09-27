'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { ScreeningResponse } from '@/api/generated'
import { useGetPaymentMethods } from '@/api/hooks'
import { initPayment } from '@/api/requests'
import { ROUTES } from '@/constants/routes'
import { getMediaSource } from '@/lib/utils'

import { useAuth } from '../../hooks/useAuth'
import { Sheet } from '../ui/sheet'

import { PaymentSheet } from './payment/payment-sheet'
import { ScreeningInfo } from './screening-info'
import { SeatPickerFooter } from './seat-picker-footer'
import { SeatsCanvas } from './seats-canvas'

export interface Seat {
	id: string
	row: number
	number: number
	label: string
	type: 'chair' | 'sofa2' | 'sofa3'
	blockId?: string
	status: 'available' | 'reserved'
	price: number
}

interface ScreeningProps {
	screening: ScreeningResponse
	seats: Seat[]
}

export function Screening({ screening, seats }: ScreeningProps) {
	const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
	const [isOpen, setIsOpen] = useState(false)

	const [saveCard, setSaveCard] = useState(true)
	const [selectedCard, setSelectedCard] = useState<string | null>(null)

	const router = useRouter()
	const { isAuthorized } = useAuth()

	const { data } = useGetPaymentMethods()

	const totalPrice = selectedSeats.reduce((s, a) => s + a.price, 0)

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ['init payment'],
		mutationFn: initPayment,
		onSuccess(data) {
			router.push(data.url)
		}
	})

	const handleCheckout = async () => {
		if (!selectedSeats.length) return

		await mutateAsync({
			screeningId: screening.id,
			seats: selectedSeats.map(s => ({ seatId: s.id, price: s.price })),
			savePaymentMethod: !selectedCard && saveCard,
			...(selectedCard && { paymentMethodId: selectedCard })
		})
	}

	return (
		<div className='relative min-h-screen bg-[#0a0c14]'>
			<div
				className='absolute inset-0 h-[90vh] max-h-[600px] w-full overflow-hidden'
				style={{
					backgroundImage: `url(${getMediaSource(screening.movie.banner)})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					filter: 'brightness(0.45)',
					maskImage:
						'linear-gradient(to bottom, black 65%, rgba(0,0,0,0) 100%)',
					WebkitMaskImage:
						'linear-gradient(to bottom, black 65%, rgba(0,0,0,0) 100%)'
				}}
			/>

			<div className='h-[4 5vh] absolute top-[35vh] right-0 left-0 bg-gradient-to-b from-transparent to-[#0a0c14]' />

			<div className='relative z-10 mx-auto max-w-6xl px-6 pt-32 text-white'>
				<ScreeningInfo screening={screening} />

				<SeatsCanvas
					seats={seats}
					selectedSeats={selectedSeats}
					setSelectedSeats={setSelectedSeats}
				/>

				{selectedSeats.length > 0 && (
					<SeatPickerFooter
						totalPrice={totalPrice}
						selectedSeats={selectedSeats}
						onCheckout={() =>
							isAuthorized
								? setIsOpen(true)
								: router.push(ROUTES.AUTH.LOGIN)
						}
						isLoading={isPending}
					/>
				)}

				<Sheet
					open={isOpen}
					onClose={() => setIsOpen(false)}
					side='right'
				>
					<PaymentSheet
						selectedSeats={selectedSeats}
						totalPrice={totalPrice}
						paymentMethods={data ?? []}
						selectedCard={selectedCard}
						setSelectedCard={setSelectedCard}
						saveCard={saveCard}
						setSaveCard={setSaveCard}
						isPending={isPending}
						onCheckout={handleCheckout}
					/>
				</Sheet>
			</div>
		</div>
	)
}
