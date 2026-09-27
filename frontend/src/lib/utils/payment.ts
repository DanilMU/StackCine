import { METHOD_LABELS, METHOD_STYLES } from '@/constants/payment-methods'

export function getCardLabel(brand: string): string {
	const key = brand?.toLowerCase()

	return METHOD_LABELS[key] ?? METHOD_LABELS.unknown
}

export function getCardStyle(brand: string) {
	const key = brand?.toLowerCase()

	return METHOD_STYLES[key] ?? METHOD_STYLES.unknown
}

export function getCardLogo(brand: string): string {
	const key = brand?.toLowerCase()

	return `/images/payment-methods/${key}.svg`
}
