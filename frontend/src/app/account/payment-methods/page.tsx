import { PaymentMethods } from '@/components/account/payment-methods'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Способы оплаты',
}

export default function AccountPaymentMethodsPage() {
	return <PaymentMethods />
}
