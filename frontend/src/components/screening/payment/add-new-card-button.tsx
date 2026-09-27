import { PlusIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

interface AddNewCardButtonProps {
	active: boolean
	onClick: () => void
}

export function AddNewCardButton({ active, onClick }: AddNewCardButtonProps) {
	return (
		<button
			onClick={onClick}
			className={cn(
				'flex w-full cursor-pointer items-center gap-3 rounded-lg border p-3 transition hover:bg-[#2A2C34]',
				active ? 'border-rose-700 bg-[#2A2C34]' : 'border-gray-800'
			)}
		>
			<div className='flex h-10 w-16 items-center justify-center rounded-md bg-rose-600 p-1.5'>
				<PlusIcon className='text-white' />
			</div>

			<div className='font-medium text-white'>Новый способ оплаты</div>
		</button>
	)
}
