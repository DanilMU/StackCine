export function formatPhone(value: string) {
	let digits = value.replace(/\D/g, '')

	if (digits.startsWith('8')) digits = '7' + digits.slice(1)
	if (!digits.startsWith('7')) digits = '7' + digits

	let result = '+7'

	if (digits.length > 1) result += ' (' + digits.slice(1, 4)
	if (digits.length >= 4) result += ') ' + digits.slice(4, 7)
	if (digits.length >= 7) result += '-' + digits.slice(7, 9)
	if (digits.length >= 9) result += '-' + digits.slice(9, 11)

	return result
}
