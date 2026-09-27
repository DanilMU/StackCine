export function formatReleaseDate(dateString: string): string | null {
	if (!dateString) return null

	const date = new Date(dateString)
	const day = date.getUTCDate()
	const monthIndex = date.getUTCMonth()

	const months = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря'
	]

	return `с ${day} ${months[monthIndex]}`
}
