'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'

import { REACT_QUERY_CONFIG } from '@/config/react-query'

interface ReactQueryProvider {
	children: ReactNode
}

export function ReactQueryProvider({ children }: ReactQueryProvider) {
	const [client] = useState(
		() =>
			new QueryClient({
				defaultOptions: REACT_QUERY_CONFIG
			})
	)

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
