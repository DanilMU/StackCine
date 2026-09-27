'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { GetMeResponse } from '@/api/generated'
import { useConfirmEmailChange, useInitEmailChange } from '@/api/hooks'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { translateError } from '@/lib/utils/error-map'

interface ChangeEmailModalProps {
	open: boolean
	onClose: () => void
	user: GetMeResponse
}

const changeEmailSchema = z.object({
	email: z.string().email('Введите корректный email'),
	code: z.string().optional()
})

type ChangeEmailFormValues = z.infer<typeof changeEmailSchema>

export function ChangeEmailModal({
	open,
	onClose,
	user
}: ChangeEmailModalProps) {
	const [step, setStep] = useState<'email' | 'code'>('email')

	const form = useForm<ChangeEmailFormValues>({
		resolver: zodResolver(changeEmailSchema),
		defaultValues: {
			email: user.email ?? '',
			code: ''
		}
	})

	const queryClient = useQueryClient()

	const { mutate: init, isPending: isInitPending } = useInitEmailChange({
		onSuccess() {
			setStep('code')
		},
		onError(error: any) {
			const msg = error?.response?.data?.message || error?.message
			form.setError('email', { message: translateError(msg) })
		}
	})

	const { mutate: confirm, isPending: isConfirmPending } =
		useConfirmEmailChange({
			onSuccess() {
				queryClient.invalidateQueries({ queryKey: ['get me'] })
				onClose()
			},
			onError(error: any) {
				const msg = error?.response?.data?.message || error?.message
				form.setError('code', { message: translateError(msg) })
			}
		})

	const onSubmit = (values: ChangeEmailFormValues) => {
		if (step === 'email') {
			init({ email: values.email })
		} else {
			confirm({
				email: values.email,
				code: values.code!
			})
		}
	}

	return (
		<Dialog open={open} onClose={onClose} title='Смена почты'>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
				{step === 'email' && (
					<Input
						label='Новая почта'
						placeholder='anton.chigurh@stackcine.ru'
						type='email'
						error={form.formState.errors.email?.message}
						{...form.register('email')}
					/>
				)}

				{step === 'code' && (
					<Input
						label='Код подтверждения'
						placeholder='123456'
						error={form.formState.errors.code?.message}
						autoFocus
						{...form.register('code')}
					/>
				)}

				<div className='flex justify-end gap-2'>
					<Button
						type='button'
						variant='outline'
						onClick={
							step === 'email' ? onClose : () => setStep('email')
						}
					>
						{step === 'email' ? 'Отмена' : 'Назад'}
					</Button>

					<Button
						type='submit'
						disabled={isInitPending || isConfirmPending}
					>
						{step === 'email' ? 'Далее' : 'Подтвердить'}
					</Button>
				</div>
			</form>
		</Dialog>
	)
}
