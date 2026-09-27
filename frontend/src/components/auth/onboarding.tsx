'use client'

import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useGetMe, usePatchUser } from '@/api/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { translateError } from '@/lib/utils/error-map'
import { onboardingSchema, type OnboardingSchema } from '@/lib/validators'

export function OnboardingForm() {
	const router = useRouter()
	const queryClient = useQueryClient()

	const { data: user, isLoading } = useGetMe()

	const form = useForm({
		defaultValues: {
			name: ''
		} as OnboardingSchema,
		validators: {
			onSubmit: onboardingSchema
		},
		onSubmit: async ({ value }) => {
			mutate(value)
		}
	})

	const { mutate, isPending } = usePatchUser({
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get me'] })
			router.replace('/account')
		},
		onError(error: any) {
			const msg = translateError(
				error?.response?.data?.message || error?.message
			)

			form.setFieldMeta('name', prev => ({
				...prev,
				errors: [msg]
			}))
		}
	})

	useEffect(() => {
		if (!isLoading && user?.name) {
			router.replace('/account')
		}
	}, [isLoading, user, router])

	return isLoading ? (
		<div className='flex min-h-screen flex-col items-center justify-center bg-[#0A0C14] p-8 text-white'>
			<LoaderIcon className='mb-6 size-14 animate-spin text-rose-700' />
			<h1 className='mb-4 text-3xl font-bold'>Загрузка...</h1>
		</div>
	) : (
		<div className='relative flex min-h-screen flex-1 items-center justify-center p-8'>
			<div className='absolute inset-0'>
				<img
					src='/images/auth/onboarding.png'
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
							<path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
						</svg>
					</div>

					<h1 className='mb-3 text-center text-3xl font-bold text-white'>
						Добро пожаловать!
					</h1>

					<p className='text-center text-[15px] font-medium text-neutral-400'>
						Нам нужно только ваше имя, чтобы завершить регистрацию
					</p>
				</div>
				<form
					onSubmit={e => {
						e.preventDefault()
						form.handleSubmit()
					}}
					className='space-y-6'
				>
					<form.Field name='name'>
						{({ state, handleChange }) => (
							<Input
								id='name'
								label='Ваше имя'
								type='text'
								placeholder='Антон Чигур'
								value={state.value}
								onChange={e => handleChange(e.target.value)}
								error={state.meta.errors[0]?.message}
								autoFocus
								autoComplete='tel'
							/>
						)}
					</form.Field>
					<Button
						onClick={() => form.handleSubmit()}
						size='lg'
						className='w-full'
						type='submit'
						disabled={isPending}
					>
						Продолжить
					</Button>
				</form>
			</div>
		</div>
	)
}
