import { z } from 'zod'

export const loginSchema = z.object({
	phone: z.string().optional(),
	email: z.string().optional(),
	code: z
		.string()
		.length(6, 'Код должен быть 6 цифр')
		.optional()
		.or(z.literal(''))
})

export type LoginSchema = z.infer<typeof loginSchema>
