export function toISO(value: string | Date | null | undefined): string | null {
	if (!value) return null

	const date = value instanceof Date ? value : new Date(value)

	if (isNaN(date.getTime())) return null

	return date.toISOString()
}
