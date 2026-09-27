'use client'

import { ArrowLeftIcon, LoaderIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useGetMe } from '@/api/hooks'
import { ROUTES } from '@/constants/routes'

import { AvatarUploader } from './avatar-uploader'
import { IdentityMethods } from './identity-methods'
import { ProfileForm } from './profile-form'

export function AccountSettings() {
	const router = useRouter()

	const { data: user, isLoading } = useGetMe()

	if (isLoading || !user) {
		return (
			<div className='flex min-h-screen flex-col items-center justify-center bg-[#0A0C14] p-8 text-white'>
				<LoaderIcon className='mb-6 size-14 animate-spin text-rose-700' />
				<h1 className='mb-4 text-3xl font-bold'>Загрузка...</h1>
			</div>
		)
	}

	return (
		<div className='flex min-h-screen justify-center bg-[#0A0C14] px-4 py-10 text-white'>
			<div className='animate-fadeIn w-full max-w-2xl space-y-7'>
				<div className='flex items-center gap-3'>
					<button
						onClick={() => router.push(ROUTES.ACCOUNT.ROOT)}
						className='cursor-pointer p-0'
					>
						<ArrowLeftIcon className='size-5 text-white transition hover:text-rose-700' />
					</button>
					<h2 className='text-2xl font-semibold'>Настройки</h2>
				</div>

				<AvatarUploader user={user} />

				<ProfileForm user={user} />

				<IdentityMethods user={user} />
			</div>
		</div>
	)
}
