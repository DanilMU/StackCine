import { getScreeningById } from '@/api/requests'
import { getSeatsByHall } from '@/api/requests/seat'
import { Screening } from '@/components/screening'
import { ScreeningError } from '@/components/screening/screening-error'

interface Props {
	params: Promise<{
		id: string
	}>
}

export default async function ScreeningPage({ params }: Props) {
	const { id } = await params

	try {
		const { screening } = await getScreeningById(id)
		const { seats } = await getSeatsByHall(screening.hall.id, screening.id)

		return <Screening screening={screening} seats={seats} />
	} catch {
		return <ScreeningError />
	}
}
