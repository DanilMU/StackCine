import { useEffect, useState } from 'react'

import { getCookie } from '@/lib/cookies'

export function useAuth() {
	const [isAuthorized, setIsAuthorized] = useState(false)

	useEffect(() => {
		setIsAuthorized(!!getCookie('accessToken'))
	}, [])

	return { isAuthorized }
}
