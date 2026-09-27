import type { Metadata } from 'next'
import { Geologica } from 'next/font/google'
import type { ReactNode } from 'react'

import '@/assets/styles/globals.css'
import { cn } from '@/lib/utils'
import { HealthCheckProvider } from '@/providers/health-check'
import { ReactQueryProvider } from '@/providers/react-query'

const font = Geologica({
	subsets: ['latin'],
	variable: '--font-geist',
	preload: true,
	display: 'swap'
})

export const metadata: Metadata = {
	title: {
		absolute: 'StackCine',
		template: `%s - StackCine`
	},
	description:
		'Премиальный онлайн-кинотеатр и сервис бронирования билетов StackCine'
}

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang='ru'>
			<body
				className={cn(
					'min-h-screen font-sans antialiased',
					font.variable
				)}
			>
				<ReactQueryProvider>
					<HealthCheckProvider>{children}</HealthCheckProvider>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
