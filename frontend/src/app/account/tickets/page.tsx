import { Tickets } from '@/components/account/tickets/tickets'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Мои билеты',
}

export default function AccountTicketsPage() {
	return <Tickets />
}
