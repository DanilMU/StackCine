export const ROUTES = {
	HOME: '/',
	THEATERS: '/theaters',
	SCHEDULE: '/schedule',
	AUTH: {
		LOGIN: '/auth/login',
		ONBOARDING: '/onboarding'
	},
	MOVIES: {
		ROOT: '/movies',
		SINGLE: (slug: string) => `/movies/${slug}`
	},
	ACCOUNT: {
		ROOT: '/account',
		TICKETS: '/account/tickets',
		PAYMENT_METHODS: '/account/payment-methods',
		SETTINGS: '/account/settings',
		NOTIFICATIONS: '/account/notifications'
	}
}
