import { AccountSettings } from '@/components/account/settings'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Настройки аккаунта',
}

export default function AccountSettingsPage() {
	return <AccountSettings />
}
