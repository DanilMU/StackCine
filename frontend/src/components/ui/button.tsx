import { cva, VariantProps } from 'class-variance-authority'

const buttonStyles = cva(
	'flex items-center justify-center rounded-full text-base font-medium cursor-pointer transition-all duration-250 disabled:pointer-events-none disabled:opacity-60 hover:scale-105 active:scale-100',
	{
		variants: {
			variant: {
				default: 'bg-rose-700 hover:bg-rose-700/85 text-white',
				outline:
					'border-2 border-white/30 text-white hover:border-white/70',
				secondary: 'bg-white hover:bg-white/90 text-black',
				gray: 'bg-[#18181B] hover:[#18181B]/90 text-white',
			},
			size: {
				sm: 'text-xs px-2 py-1',
				md: 'px-6 py-2',
				default: 'px-6 py-2.5',
				lg: 'px-8 py-3',
				icon: 'p-2',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonStyles> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
	return (
		<button
			className={buttonStyles({ variant, size, className })}
			{...props}
		/>
	)
}
