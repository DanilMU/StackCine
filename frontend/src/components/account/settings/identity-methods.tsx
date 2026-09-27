import { ReactNode, useState } from 'react'
import { MailIcon, PhoneIcon, PlusIcon, PencilIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ChangeEmailModal } from './change-email-modal'
import { ChangePhoneModal } from './change-phone-modal'
import type { GetMeResponse } from '@/api/generated'

interface IdentityMethodsProps {
	user: GetMeResponse
}

export function IdentityMethods({ user }: IdentityMethodsProps) {
	const [openEmail, setOpenEmail] = useState(false)
	const [openPhone, setOpenPhone] = useState(false)

	return (
		<div>
			<h2 className='text-xl font-semibold mb-2'>Аккаунт</h2>
			<div>
				<RowItem
					icon={<MailIcon className='size-6 text-neutral-300' />}
					label='Электронная почта'
					value={user?.email}
					onClick={() => setOpenEmail(true)}
				/>

				<div className='h-[0.8px] my-3 bg-neutral-600 w-full' />

				<RowItem
					icon={<PhoneIcon className='size-6 text-neutral-300' />}
					label='Номер телефона'
					value={user?.phone}
					onClick={() => setOpenPhone(true)}
				/>
			</div>

			<ChangeEmailModal
				open={openEmail}
				onClose={() => setOpenEmail(false)}
				user={user}
			/>

			<ChangePhoneModal
				open={openPhone}
				onClose={() => setOpenPhone(false)}
				user={user}
			/>
		</div>
	)
}

interface RowItemProps {
	icon: ReactNode
	label: string
	value?: string
	onClick: () => void
}

function RowItem({ icon, label, value, onClick }: RowItemProps) {
	const isMissing = !value

	return (
		<div className='flex items-center justify-between px-4 py-4 transition-colors'>
			<div className='flex items-center gap-4'>
				<div className='size-12 rounded-full bg-[#242730] flex items-center justify-center'>
					{icon}
				</div>

				<div>
					<p className='text-sm text-neutral-400'>{label}</p>

					{isMissing ? (
						<p className='text-base font-medium text-red-400'>
							Не привязано
						</p>
					) : (
						<p className='text-base font-medium'>{value}</p>
					)}
				</div>
			</div>
			<Button
				variant={isMissing ? 'default' : 'outline'}
				className='gap-2'
				onClick={onClick}
			>
				{isMissing ? (
					<>
						<PlusIcon className='size-4' /> Привязать
					</>
				) : (
					<>
						<PencilIcon className='size-4' /> Изменить
					</>
				)}
			</Button>
		</div>
	)
}
