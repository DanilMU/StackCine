export const errorMessages: Record<string, string> = {
	'Invalid or expired code': 'Неверный или просроченный код',
	'User not found': 'Пользователь не найден',
	'Phone already registered': 'Телефон уже зарегистрирован',
	'Email already registered': 'Email уже зарегистрирован',
	'Too many attempts': 'Слишком много попыток. Попробуйте позже',
	Unauthorized: 'Неверные данные'
}

export function translateError(message?: string): string {
	if (!message) return 'Произошла ошибка. Попробуйте позже'

	return errorMessages[message] ?? 'Произошла неизвестная ошибка'
}
