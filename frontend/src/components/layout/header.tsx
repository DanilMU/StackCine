'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

export function Header() {
	const { isAuthorized } = useAuth()

	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 20)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<header
			className={cn(
				'fixed top-0 right-0 left-0 z-50 transition-colors duration-400 ease-in-out',
				isScrolled ? 'bg-[#0A0C14]' : 'border-b-0 bg-transparent'
			)}
		>
			<div className='mx-auto max-w-7xl px-6 py-4'>
				<div className='flex items-center justify-between'>
					<Link href='/' className='flex items-center space-x-2'>
						<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-rose-700'>
							<svg
								className='text-primary-foreground h-5 w-5'
								fill='currentColor'
								viewBox='0 0 24 24'
							>
								<path d='M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z' />
							</svg>
						</div>
						<span className='text-foreground text-xl font-bold'>
							StackCine
						</span>
					</Link>

					<nav className='hidden items-center space-x-8 md:flex'>
						<Link
							href={ROUTES.MOVIES.ROOT}
							className='text-foreground hover:text-accent transition-colors duration-200'
						>
							Фильмы
						</Link>
						<Link
							href={ROUTES.THEATERS}
							className='text-foreground hover:text-accent transition-colors duration-200'
						>
							Кинотеатры
						</Link>
						<Link
							href={ROUTES.SCHEDULE}
							className='text-foreground hover:text-accent transition-colors duration-200'
						>
							Расписание
						</Link>
					</nav>

					<div className='relative flex items-center space-x-4'>
						<div className='relative z-20 flex items-center space-x-5'>
							{isAuthorized ? (
								<Button size='md'>
									<Link href={ROUTES.ACCOUNT.ROOT}>
										Личный кабинет
									</Link>
								</Button>
							) : (
								<Button size='md'>
									<Link href={ROUTES.AUTH.LOGIN}>Войти</Link>
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
