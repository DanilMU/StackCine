import Link from 'next/link'
import { Button } from '../ui/button'

export function Sidebar() {
	const links = [
		{ label: 'Фильмы', href: '/movies' },
		{ label: 'Расписание', href: '/schedule' },
		{ label: 'Акции', href: '/promotions' },
		{ label: 'Кинотеатры', href: '/theaters' },
		{ label: 'О компании', href: '/about' },
		{ label: 'Вакансии', href: '/careers' },
		{ label: 'Реклама', href: '/advertising' },
		{ label: 'Контакты', href: '/contacts' },
	]

	return (
		<nav className='w-full lg:w-64 lg:pr-8'>
			<div className='lg:sticky lg:top-8'>
				<ul className='flex lg:flex-col gap-2 lg:gap-4 overflow-x-auto lg:overflow-visible custom-scrollbar bg-zinc-900 rounded-xl p-4 shadow-md'>
					{links.map((link, index) => (
						<li
							key={index}
							className={`flex-shrink-0 ${
								index >= 4 ? 'lg:block hidden' : ''
							}`}
						>
							<Link
								href={link.href}
								className='nav-link whitespace-nowrap'
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>

				<div className='mt-6 p-4 bg-primary rounded-xl text-white shadow-lg'>
					<h3 className='font-semibold text-lg'>
						Скидка 20% на все билеты!
					</h3>
					<p className='text-sm font-medium mt-1'>
						Успейте воспользоваться акцией и посетить лучшие фильмы
						этого сезона.
					</p>
					<Button variant='secondary' className='mt-3 w-full'>
						<Link href='/promotions'>Подробнее</Link>
					</Button>
				</div>
			</div>
		</nav>
	)
}
