import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import type { Seat } from '.'
import type { Dispatch, SetStateAction } from 'react'

interface SeatsCanvasProps {
	seats: Seat[]
	selectedSeats: Seat[]
	setSelectedSeats: Dispatch<SetStateAction<Seat[]>>
}

export function SeatsCanvas({
	seats,
	selectedSeats,
	setSelectedSeats,
}: SeatsCanvasProps) {
	const groupSeatsByRow = (seats: Seat[]) => {
		const grouped: Record<number, Seat[]> = {}
		seats.forEach((seat) => {
			if (!grouped[seat.row]) grouped[seat.row] = []
			grouped[seat.row].push(seat)
		})
		Object.values(grouped).forEach((r) =>
			r.sort((a, b) => a.number - b.number)
		)
		return grouped
	}

	const groupedByRow = groupSeatsByRow(seats)

	const toggleSeat = (seat: Seat) => {
		if (seat.status === 'reserved') return

		setSelectedSeats((prev) =>
			prev.some((s) => s.id === seat.id)
				? prev.filter((s) => s.id !== seat.id)
				: [...prev, seat]
		)
	}

	return (
		<div className='w-full flex flex-col items-center text-white pb-32'>
			<TransformWrapper
				initialScale={1}
				minScale={0.8}
				maxScale={2.5}
				doubleClick={{ disabled: true }}
				wheel={{ step: 0.01 }}
			>
				<TransformComponent>
					<div className='flex flex-col items-center gap-6'>
						<div className='flex flex-col items-center mb-6 select-none'>
							<svg
								viewBox='0 0 300 80'
								className='w-[70vw] max-w-3xl opacity-90'
							>
								<path
									d='M10,60 Q150,10 290,60'
									stroke='white'
									strokeWidth='4'
									fill='none'
									strokeLinecap='round'
								/>
							</svg>
							<div className='text-white -mt-16 tracking-[0.35em] font-semibold text-xl'>
								Э К Р А Н
							</div>
						</div>

						<div className='flex gap-6 items-start'>
							<div className='flex flex-col gap-3 text-sm opacity-80 select-none text-right'>
								{Object.values(groupedByRow).map((row, idx) => (
									<div
										key={idx}
										className='h-10 flex items-center pr-2'
									>
										Ряд {row[0].row}
									</div>
								))}
							</div>

							<div className='flex flex-col gap-3 items-center'>
								{Object.values(groupedByRow).map(
									(row, rowIdx) => (
										<div
											key={rowIdx}
											className='flex gap-2 justify-center'
										>
											{row.map((seat) => {
												const isSelected =
													selectedSeats.some(
														(s) => s.id === seat.id
													)

												const base =
													'h-10 rounded-md text-sm font-medium flex items-center justify-center transition-all duration-150 select-none'

												const seatWidth =
													seat.type === 'sofa2'
														? `calc(2 * 2.5rem + 0.5rem)`
														: seat.type === 'sofa3'
														? `calc(3 * 2.5rem + 1rem)`
														: '2.5rem'

												let color = ''
												let cursor = ''

												if (
													seat.status === 'reserved'
												) {
													color =
														'bg-rose-600 opacity-80'
													cursor =
														'cursor-not-allowed'
												} else if (isSelected) {
													color =
														'bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.7)]'
													cursor = 'cursor-pointer'
												} else {
													color =
														'bg-[#1f212a] hover:bg-[#2b2d36]'
													cursor = 'cursor-pointer'
												}

												const label =
													seat.type === 'chair'
														? seat.number
														: 'Диван'

												return (
													<div
														key={seat.id}
														className='flex flex-col items-center'
													>
														<button
															onClick={() =>
																toggleSeat(seat)
															}
															disabled={
																seat.status ===
																'reserved'
															}
															style={{
																width: seatWidth,
															}}
															className={`${base} ${color} ${cursor}`}
														>
															{label}
														</button>
													</div>
												)
											})}
										</div>
									)
								)}
							</div>
						</div>
					</div>
				</TransformComponent>
			</TransformWrapper>
		</div>
	)
}
