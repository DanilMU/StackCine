import { z } from 'zod'

export const onboardingSchema = z.object({
	name: z
		.string()
		.min(2, 'Имя должно быть длиннее')
		.max(40, 'Имя слишком длинное')
})

export type OnboardingSchema = z.infer<typeof onboardingSchema>
