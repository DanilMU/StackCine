import type { Metadata } from 'next'
import Link from 'next/link'

import { getAllTheaters } from '@/api/requests/theater'

export const metadata: Metadata = {
	title: 'Кинотеатры'
}

export default async function TheatersPage() {
	const theaters = await getAllTheaters()

	return (
		<section className='bg-background pt-28 pb-20'>
			<div className='mx-auto max-w-7xl px-6'>
				<h1 className='mb-12 text-center text-5xl font-bold text-white'>
					Кинотеатры
				</h1>

				<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
					{theaters.map((theater, index) => (
						<Link
							key={index}
							href={`/schedule?theater=${theater.id}`}
							className='relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-[#7a1028] via-[#9d1534] to-[#d21f4a] p-6 shadow-lg transition-transform hover:scale-[1.03]'
						>
							<h2 className='mb-2 text-xl font-bold text-white'>
								{theater.name}
							</h2>
							<p className='text-zinc-200'>{theater.address}</p>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}
