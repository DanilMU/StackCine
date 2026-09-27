import type { Metadata } from 'next'

import { Login } from '@/components/auth/login'

export const metadata: Metadata = {
	title: 'Войти'
}

export default function LoginPage() {
	return <Login />
}
