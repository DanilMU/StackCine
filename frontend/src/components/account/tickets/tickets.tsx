'use client'

import { useMutation } from '@tanstack/react-query'
import {
	ArrowLeftIcon,
	CalendarIcon,
	ClockIcon,
	MapPinIcon,
	QrCodeIcon,
	TicketIcon,
	TicketsIcon,
	XIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { GetUserBookingsResponse } from '@/api/generated'
import { useGetBookings } from '@/api/hooks'
import { createRefund } from '@/api/requests'
import { AlertDialog } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ROUTES } from '@/constants/routes'
import { getMediaSource } from '@/lib/utils'

export function Tickets() {
	const [activeOrder, setActiveOrder] =
		useState<GetUserBookingsResponse | null>(null)
	const [refundTarget, setRefundTarget] = useState<string | null>(null)

	const { data, isLoading } = useGetBookings()
	const { mutate } = useMutation({
		mutationKey: ['cancel booking'],
		mutationFn: createRefund
	})

	const router = useRouter()

	const openOrder = useCallback(
		(orderId: string) => {
			const ord = data?.find(o => o.id === orderId) ?? null

			setActiveOrder(ord)

			if (typeof window !== 'undefined')
				document.body.style.overflow = 'hidden'
		},
		[data]
	)

	const closeOrder = useCallback(() => {
		setActiveOrder(null)
		if (typeof window !== 'undefined') document.body.style.overflow = ''
	}, [])

	return (
		<>
			<div className='flex min-h-screen justify-center bg-[#0A0C14] py-10 text-white'>
				<div className='w-full max-w-2xl space-y-8 px-4'>
					<div className='flex items-center gap-3'>
						<button
							onClick={() => router.push(ROUTES.ACCOUNT.ROOT)}
							className='cursor-pointer p-0'
						>
							<ArrowLeftIcon className='size-5 text-white transition hover:text-rose-700' />
						</button>
						<h2 className='text-2xl font-semibold'>Мои заказы</h2>
					</div>

					{isLoading ? (
						<div className='space-y-6'>
							{[1, 2, 3].map(i => (
								<div
									key={i}
									className='relative rounded-xl bg-[#1A1C24] px-7 py-6'
								>
									<div className='pointer-events-none'>
										<div className='absolute top-1/2 -left-5 size-9 -translate-y-1/2 rounded-full bg-[#0A0C14]' />
										<div className='absolute top-1/2 -right-5 size-9 -translate-y-1/2 rounded-full bg-[#0A0C14]' />
									</div>

									<div className='flex items-center gap-5'>
										<Skeleton className='h-[160px] w-[110px] rounded-lg' />

										<div className='flex-1 space-y-3'>
											<Skeleton className='h-6 w-48' />
											<div className='flex gap-3'>
												<Skeleton className='h-4 w-24' />
												<Skeleton className='h-4 w-20' />
											</div>

											<Skeleton className='mt-4 h-4 w-32' />

											<div className='mt-4 flex gap-3'>
												<Skeleton className='h-10 w-32 rounded-full' />
												<Skeleton className='h-10 w-32 rounded-full' />
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					) : data?.length === 0 ? (
						<div className='flex h-[70vh] flex-col items-center justify-center text-center'>
							<div className='mb-4 flex size-16 items-center justify-center rounded-full bg-[#2A2C34]'>
								<TicketsIcon className='size-8 text-neutral-400' />
							</div>

							<h2 className='mb-2 text-xl font-semibold'>
								У вас пока нет заказов
							</h2>
							<p className='mb-6 max-w-xs text-sm text-neutral-400'>
								Купите билет на лучший фильм и наслаждайтесь
								кино на большом экране
							</p>

							<Button>
								<Link href='/movies'>За билетами</Link>
							</Button>
						</div>
					) : (
						<div className='space-y-6'>
							{data?.map((order, index) => (
								<article
									key={index}
									className='relative cursor-pointer rounded-xl bg-[#1A1C24] px-7 py-6 transition-colors hover:bg-[#2A2C34]'
									onClick={() => openOrder(order.id)}
								>
									<div className='pointer-events-none'>
										<div className='absolute top-1/2 -left-5 size-9 -translate-y-1/2 transform rounded-full bg-[#0A0C14]' />
										<div className='absolute top-1/2 -right-5 size-9 -translate-y-1/2 transform rounded-full bg-[#0A0C14]' />
									</div>

									<div className='flex items-center gap-5'>
										<Image
											src={getMediaSource(order.movie.poster)}
											alt={order.movie.title}
											width={110}
											height={200}
											className='rounded-lg object-cover'
										/>

										<div className='flex-1'>
											<div className='flex items-start justify-between'>
												<div>
													<h3 className='text-2xl leading-tight font-semibold'>
														{order.movie.title}
													</h3>
													<div className='mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-400'>
														<span className='flex items-center gap-1'>
															<CalendarIcon className='size-4' />
															{order.screeningDate.replace(
																/-/g,
																'.'
															)}
														</span>
														<span className='flex items-center gap-1'>
															<ClockIcon className='size-4' />
															{
																order.screeningTime
															}
														</span>
													</div>
												</div>
											</div>

											<div className='mt-3 text-sm'>
												<div className='flex items-center gap-1'>
													<MapPinIcon className='size-4 text-neutral-400' />
													<span className='text-neutral-400'>
														{order.theater.name.toUpperCase()}
													</span>
												</div>
											</div>

											<div className='mt-4 flex gap-3'>
												<Button
													variant='outline'
													size='md'
													onClick={e => {
														e.stopPropagation()
														openOrder(order.id)
													}}
												>
													<QrCodeIcon className='mr-2 size-5' />
													Открыть билет
												</Button>

												<Button
													variant='outline'
													size='md'
													onClick={e => {
														e.stopPropagation()
														setRefundTarget(
															order.id
														)
													}}
												>
													<TicketIcon className='mr-2 size-5' />
													Возврат
												</Button>
											</div>
										</div>
									</div>
								</article>
							))}
						</div>
					)}
				</div>
			</div>

			{activeOrder && (
				<div
					className='fixed inset-0 z-50 flex items-center justify-center px-4'
					role='dialog'
					aria-modal='true'
				>
					<div
						className='absolute inset-0 bg-black/60 backdrop-blur-sm'
						onClick={closeOrder}
					/>

					<div className='relative mx-auto w-full max-w-md'>
						<div className='overflow-hidden rounded-3xl bg-[#1A1C24] text-white'>
							<div className='p-6 text-center'>
								<div className='text-sm text-neutral-400'>
									{activeOrder.screeningDate.replace(
										/-/g,
										'.'
									)}{' '}
									• {activeOrder.screeningTime}
								</div>

								<h2 className='mt-2 text-xl font-bold'>
									{activeOrder.movie.title}
								</h2>
								<div className='mt-5 flex justify-center'>
									<img
										src={activeOrder.qrCode}
										alt='QR'
										className='h-64 w-64 rounded-2xl object-contain'
									/>
								</div>

								<div className='mt-5 text-sm text-white'>
									<div className='text-lg font-medium'>
										Ваш билет
									</div>
									<div className='mt-1 text-xs text-neutral-400'>
										Покажите этот QR-код контроллеру при
										входе
									</div>
								</div>

								<div className='mt-6 flex items-center justify-center gap-4'>
									<button
										onClick={closeOrder}
										className='flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-rose-700 text-white shadow-md'
										aria-label='Закрыть'
									>
										<XIcon className='size-5' />
									</button>
								</div>
							</div>

							<div className='bg-[#242730] p-4 text-center'>
								<div className='text-sm font-medium text-white'>
									{activeOrder.theater.name}
								</div>
								<div className='mt-1 text-xs text-neutral-400'>
									{activeOrder.seats.join(', ')}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

			<AlertDialog
				open={!!refundTarget}
				onClose={() => setRefundTarget(null)}
				onConfirm={() => {
					if (refundTarget) mutate({ bookingId: refundTarget })
				}}
				title='Вернуть билет?'
				description={
					refundTarget
						? `Заказ будет отменён, места снова поступят в продажу.

Деньги будут возвращены на карту в течение одного рабочего дня.`
						: ''
				}
				confirmText='Вернуть'
				cancelText='Отмена'
				confirmVariant='danger'
			/>
		</>
	)
}
