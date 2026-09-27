import { Button } from '@/components/ui/button'
import { FilmIcon } from 'lucide-react'
import Link from 'next/link'

export function ScreeningError() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[100vh] text-center text-white px-6'>
			<div className='flex flex-col items-center justify-center bg-[#1A1C24] p-10 rounded-2xl shadow-lg max-w-md'>
				<div className='flex justify-center mb-6'>
					<FilmIcon className='w-16 h-16 text-rose-600' />
				</div>

				<h1 className='text-3xl font-bold mb-3'>Сеанс не найден</h1>

				<p className='text-neutral-400 mb-8'>
					Похоже, такого сеанса больше не существует. Возможно, он был
					удалён или вы перешли по неверной ссылке.
				</p>

				<div className='flex gap-4'>
					<Button size='lg'>
						<Link href='/'>На главную</Link>
					</Button>

					<Button size='lg' variant='outline'>
						<Link href='/schedule'>Расписание</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
