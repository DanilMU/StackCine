'use client'

import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { z } from 'zod'

import type { GetMeResponse } from '@/api/generated'
import { usePatchUser } from '@/api/hooks'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface ProfileFormProps {
	user: GetMeResponse
}

const schema = z.object({
	name: z
		.string()
		.min(1, 'Имя слишком короткое')
		.max(30, 'Слишком длинное имя')
})

export function ProfileForm({ user }: ProfileFormProps) {
	const initialValue = user?.name ?? ''

	const queryClient = useQueryClient()
	const inputRef = useRef<HTMLInputElement>(null)

	const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>(
		'idle'
	)

	const { mutate: patchUser } = usePatchUser({
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get me'] })
			setStatus('saved')
			setTimeout(() => setStatus('idle'), 1500)
		},
		onError() {
			setStatus('error')
			setTimeout(() => setStatus('idle'), 2000)
		}
	})

	const form = useForm({
		defaultValues: {
			name: initialValue
		},
		validators: {
			onChange: schema
		},
		onSubmit: async ({ value }) => {
			if (value.name === initialValue) return
			setStatus('saving')
			patchUser(value)
		}
	})

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		value: string
	) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			if (value !== initialValue) {
				form.handleSubmit()
			}
			inputRef.current?.blur()
		}
	}

	const handleBlur = (value: string) => {
		if (value !== initialValue) {
			form.handleSubmit()
		}
	}

	return (
		<div className='space-y-2'>
			<form.Field name='name'>
				{({ state, handleChange }) => (
					<>
						<Input
							id='name'
							label='Имя'
							type='text'
							placeholder='Anton Chigurh'
							value={state.value}
							onChange={e => handleChange(e.target.value)}
							onBlur={() => handleBlur(state.value)}
							onKeyDown={e => handleKeyDown(e, state.value)}
							ref={inputRef}
							className={cn(
								status === 'saving' && 'ring-1 ring-blue-400',
								status === 'error' && 'ring-1 ring-red-400'
							)}
							error={state.meta.errors[0]?.message}
						/>
					</>
				)}
			</form.Field>

			<div
				className={cn(
					'h-5 text-sm transition-opacity',
					status === 'idle' && 'opacity-0'
				)}
			>
				{status === 'saving' && (
					<span className='text-neutral-400'>Сохраняем…</span>
				)}
				{status === 'saved' && (
					<span className='text-green-600'>Сохранено ✓</span>
				)}
				{status === 'error' && (
					<span className='text-red-600'>Ошибка при сохранении</span>
				)}
			</div>
		</div>
	)
}
