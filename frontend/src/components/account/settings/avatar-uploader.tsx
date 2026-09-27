'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useChangeAvatar } from '@/api/hooks'
import type { GetMeResponse } from '@/api/generated'
import { getMediaSource } from '@/lib/utils'
import { useQueryClient } from '@tanstack/react-query'

interface AvatarUploaderProps {
	user: GetMeResponse
}

export function AvatarUploader({ user }: AvatarUploaderProps) {
	const fileRef = useRef<HTMLInputElement | null>(null)

	const queryClient = useQueryClient()

	const { mutate: changeAvatar } = useChangeAvatar({
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['get me'] })
		},
	})

	const handleFile = (e: any) => {
		const file = e.target.files?.[0]
		if (!file) return
		changeAvatar(file)
	}

	return (
		<div className='flex items-center gap-6'>
			<div
				className='relative cursor-pointer'
				onClick={() => fileRef.current?.click()}
			>
				{user?.avatar ? (
					<Image
						src={getMediaSource(user.avatar)}
						alt='Avatar'
						width={90}
						height={90}
						className='rounded-full object-cover'
					/>
				) : (
					<div className='size-[90px] rounded-full bg-[#242730] flex items-center justify-center text-3xl text-neutral-300'>
						{user?.name?.[0]?.toUpperCase()}
					</div>
				)}

				<input
					type='file'
					ref={fileRef}
					className='hidden'
					accept='image/*'
					onChange={handleFile}
				/>
			</div>

			<div>
				<h2 className='text-xl font-medium'>Аватарка</h2>
				<p className='text-sm text-neutral-400'>
					Форматы: JPEG, PNG, WEBP, GIF. Максимальный размер: 10 МБ.
				</p>
			</div>
		</div>
	)
}
