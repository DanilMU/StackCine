import type { ReactNode } from 'react'

import { Header } from '@/components/layout/header'

interface SiteLayoutProps {
	children: ReactNode
}

export default function SiteLayout({ children }: SiteLayoutProps) {
	return (
		<div className='font-cinema min-h-screen text-white'>
			<Header />
			{children}
		</div>
	)
}
