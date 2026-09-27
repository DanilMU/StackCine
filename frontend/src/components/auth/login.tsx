'use client'

import { useForm } from '@tanstack/react-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaTelegram } from 'react-icons/fa'

import {
	useGetMe,
	useInitTelegram,
	useSendOtpCode,
	useVerifyOtpCode
} from '@/api/hooks'
import { ROUTES } from '@/constants/routes'
import { setCookie } from '@/lib/cookies'
import { formatPhone, translateError } from '@/lib/utils'
import { LoginSchema, loginSchema } from '@/lib/validators'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

import { LoginTabs, type LoginTabType } from './login-tabs'

export function Login() {
	const [isRedirecting, setIsRedirecting] = useState(false)
	const [tab, setTab] = useState<LoginTabType>('phone')
	const [step, setStep] = useState<'input' | 'code'>('input')

	const router = useRouter()
	const searchParams = useSearchParams()

	const { refetch } = useGetMe({
		enabled: false
	})

	const form = useForm({
		defaultValues: {
			phone: '',
			email: '',
			code: ''
		} as LoginSchema,
		validators: {
			onSubmit: loginSchema
		},
		onSubmit: async ({ value }) => {
			if (step === 'input') {
				if (tab === 'phone') {
					send({
						identifier: `+${value.phone?.replace(/\D/g, '')}`,
						type: 'phone'
					})
				} else {
					send({
						identifier: value.email!,
						type: 'email'
					})
				}
			} else {
				const identifier =
					tab === 'phone'
						? `+${value.phone?.replace(/\D/g, '')}`
						: value.email

				verify({
					identifier: identifier ?? '',
					code: value.code!,
					type: tab
				})
			}
		}
	})

	const { mutate: send } = useSendOtpCode({
		onSuccess() {
			setStep('code')
		},
		onError(error: any) {
			const msg = translateError(
				error?.response?.data?.message || error?.message
			)

			if (tab === 'phone')
				form.setFieldMeta('phone', prev => ({
					...prev,
					errors: [msg]
				}))
			else
				form.setFieldMeta('email', prev => ({
					...prev,
					errors: [msg]
				}))
		}
	})

	const { mutate: verify } = useVerifyOtpCode({
		onSuccess: async data => {
			setCookie('accessToken', data.accessToken)

			const user = await refetch()

			if (!user?.data?.name) router.replace(ROUTES.AUTH.ONBOARDING)
			else router.replace(ROUTES.ACCOUNT.ROOT)
		},
		onError(error: any) {
			const msg = translateError(
				error?.response?.data?.message || error?.message
			)

			form.setFieldMeta('code', prev => ({
				...prev,
				errors: [msg]
			}))
		}
	})

	const { mutate: initTelegram } = useInitTelegram({
		onSuccess(data) {
			router.push(data.url)
		}
	})

	useEffect(() => {
		const token = searchParams.get('token')

		if (token) {
			setCookie('accessToken', token)
			setIsRedirecting(true)
			setTimeout(() => {
				router.replace(ROUTES.ACCOUNT.ROOT)
			}, 500)
		}
	}, [searchParams, router])

	if (isRedirecting) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center bg-[#0A0C14] p-8 text-white'>
				<h1 className='mb-4 text-3xl font-bold'>Загрузка...</h1>
				<p className='max-w-sm text-center text-neutral-400'>
					Идет вход в ваш аккаунт. Пожалуйста, подождите несколько
					секунд.
				</p>
			</div>
		)
	}

	return (
		<div className='relative flex min-h-screen flex-1 items-center justify-center p-8'>
			<div className='absolute inset-0'>
				<img
					src='/images/auth/login.png'
					// src='https://i.pinimg.com/1200x/f8/36/79/f83679750ccc14eb7b5257a182b0e41a.jpg'
					alt='Background'
					className='h-full w-full object-cover'
				/>
				<div className='absolute inset-0 bg-black/60' />
			</div>

			<div className='relative w-full max-w-md rounded-3xl bg-[#0A0C14] p-8'>
				<div className='mb-8 flex flex-col items-center justify-center'>
					<div className='mb-3.5 flex size-13 items-center justify-center rounded-full bg-rose-700'>
						<svg
							className='text-primary-foreground size-7'
							fill='currentColor'
							viewBox='0 0 24 24'
						>
							<path d='M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z' />
						</svg>
					</div>
					<h1 className='mb-3 text-center text-3xl font-bold text-white'>
						Войти в StackCine
					</h1>
					<p className='text-center text-[15px] font-medium text-neutral-400'>
						Введите номер телефона или войдите через Telegram для
						доступа к своему аккаунту
					</p>
				</div>

				<LoginTabs tab={tab} setTab={setTab} />

				<form
					onSubmit={e => {
						e.preventDefault()
						// form.handleSubmit()
					}}
					className='space-y-6'
				>
					{tab === 'phone' && (
						<>
							{step === 'input' && (
								<form.Field name='phone'>
									{({ state, handleChange }) => (
										<Input
											id='phone'
											label='Номер телефона'
											type='tel'
											placeholder='+79999999999'
											value={state.value}
											onChange={e =>
												handleChange(
													formatPhone(e.target.value)
												)
											}
											error={
												state.meta.errors[0]?.message
											}
											autoFocus
											autoComplete='tel'
										/>
									)}
								</form.Field>
							)}

							{step === 'code' && (
								<form.Field name='code'>
									{({ state, handleChange }) => (
										<Input
											id='code'
											label='6-значный код'
											type='text'
											placeholder='Введите код'
											value={state.value}
											onChange={e =>
												handleChange(e.target.value)
											}
											error={
												state.meta.errors[0]?.message
											}
											autoFocus
										/>
									)}
								</form.Field>
							)}
						</>
					)}

					{tab === 'email' && (
						<>
							{step === 'input' && (
								<form.Field name='email'>
									{({ state, handleChange }) => (
										<Input
											id='email'
											label='Email'
											type='email'
											placeholder='anton.chigurh@stackcine.ru'
											value={state.value}
											onChange={e =>
												handleChange(e.target.value)
											}
											error={
												state.meta.errors[0]?.message
											}
											autoComplete='email'
											autoFocus
										/>
									)}
								</form.Field>
							)}

							{step === 'code' && (
								<form.Field name='code'>
									{({ state, handleChange }) => (
										<Input
											id='code'
											label='6-значный код'
											type='text'
											placeholder='Введите код'
											value={state.value}
											onChange={e =>
												handleChange(e.target.value)
											}
											error={
												state.meta.errors[0]?.message
											}
											autoFocus
										/>
									)}
								</form.Field>
							)}
						</>
					)}

					<Button
						onClick={() => form.handleSubmit()}
						size='lg'
						className='w-full'
						type='submit'
					>
						{step === 'input' ? 'Отправить код' : 'Подтвердить код'}
					</Button>
				</form>

				<div className='my-6 flex items-center'>
					<div className='flex-1 border-t border-zinc-800'></div>
					<span className='px-4 text-sm text-neutral-400'>Или</span>
					<div className='flex-1 border-t border-zinc-800'></div>
				</div>

				<div className='space-y-4'>
					<Button
						onClick={initTelegram}
						variant='outline'
						size='lg'
						className='w-full gap-2.5'
					>
						<FaTelegram fill='#FFFFFF' width={24} height={24} />
						<span>Продолжить через Telegram</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
