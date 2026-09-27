import { MailIcon, SmartphoneIcon } from 'lucide-react'
import { Dispatch, JSX, SetStateAction } from 'react'

import { cn } from '@/lib/utils'

export type LoginTabType = 'phone' | 'email'

interface LoginTab {
	id: LoginTabType
	label: string
	icon: JSX.Element
}

const LOGIN_TABS: LoginTab[] = [
	{
		id: 'phone',
		label: 'Телефон',
		icon: <SmartphoneIcon size={16} />
	},
	{
		id: 'email',
		label: 'Почта',
		icon: <MailIcon size={16} />
	}
]

interface LoginTabsProps {
	tab: LoginTabType
	setTab: Dispatch<SetStateAction<LoginTabType>>
}

export function LoginTabs({ tab, setTab }: LoginTabsProps) {
	return (
		<div className='mb-6 flex border-b border-zinc-800'>
			{LOGIN_TABS.map((item, index) => (
				<button
					key={index}
					type='button'
					onClick={() => setTab(item.id)}
					className={cn(
						'flex-1 py-2 text-center transition',
						tab === item.id
							? 'border-b-2 border-rose-600 text-white'
							: 'text-neutral-400 hover:text-neutral-200'
					)}
				>
					<div className='flex items-center justify-center gap-2'>
						{item.icon}
						<span>{item.label}</span>
					</div>
				</button>
			))}
		</div>
	)
}
