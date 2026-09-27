export function getMediaSource(path?: string | null) {
	if (!path) return ''
	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path
	}
	const baseUrl = (process.env.NEXT_PUBLIC_MEDIA_URL ?? '').replace(/\/+$/, '')
	const normalizedPath = path.startsWith('/') ? path : `/${path}`
	return `${baseUrl}${normalizedPath}`
}

