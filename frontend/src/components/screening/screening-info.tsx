import { CalendarIcon, ClockIcon, MapPinIcon, FilmIcon } from 'lucide-react'

function formatDate(dateString: string) {
	const date = new Date(dateString)
	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
	}).format(date)
}

function formatTime(dateString: string) {
	const date = new Date(dateString)
	return new Intl.DateTimeFormat('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
	}).format(date)
}

function getDuration(start: string, end: string) {
	const startDate = new Date(start)
	const endDate = new Date(end)
	return Math.round((endDate.getTime() - startDate.getTime()) / 60000)
}

export function ScreeningInfo({ screening }: { screening: any }) {
	const date = formatDate(screening.startAt)
	const timeStart = formatTime(screening.startAt)
	const timeEnd = formatTime(screening.endAt)
	const duration = getDuration(screening.startAt, screening.endAt)

	return (
		<div className='bg-transparent backdrop-blur-lg rounded-2xl max-w-xl mx-auto p-6 border border-white/10 shadow-xl'>
			<h1 className='text-4xl font-bold mb-4 flex items-center gap-3 text-white'>
				{screening.movie.title}
			</h1>

			<div className='space-y-3 text-neutral-300 text-[15px]'>
				<div className='flex items-center gap-2'>
					<MapPinIcon className='size-4 text-neutral-500' />
					<span>
						{screening.theater.name}, {screening.theater.address}
					</span>
				</div>

				<div className='flex items-center gap-2'>
					<FilmIcon className='size-4 text-neutral-500' />
					<span>{screening.hall.name}</span>
				</div>

				<div className='flex items-center gap-2'>
					<ClockIcon className='size-4 text-neutral-500' />
					<span>
						{date} в {timeStart}-{timeEnd} • {duration} мин
					</span>
				</div>
			</div>
		</div>
	)
}
