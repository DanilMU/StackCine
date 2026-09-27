import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = [/^\/onboarding$/, /^\/account(\/.*)?$/]
const AUTH_ROUTES = [/^\/auth\/login$/, /^\/auth$/]

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	const accessToken = req.cookies.get('accessToken')?.value

	const isProtected = PROTECTED_ROUTES.some(r => r.test(pathname))
	const isAuthRoute = AUTH_ROUTES.some(r => r.test(pathname))

	if (!accessToken && isProtected) {
		const loginUrl = req.nextUrl.clone()

		loginUrl.pathname = '/auth/login'

		return NextResponse.redirect(loginUrl)
	}

	if (accessToken && isAuthRoute) {
		const accountUrl = req.nextUrl.clone()

		accountUrl.pathname = '/account'

		return NextResponse.redirect(accountUrl)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/auth/:path*', '/onboarding', '/account/:path*']
}
