'use client'

import { useEffect, useRef } from 'react'

interface DropdownMenuProps {
	items: string[]
	onSelect: (item: string) => void
	onClose: () => void
}

export function DropdownMenu({ items, onSelect, onClose }: DropdownMenuProps) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onClose()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onClose])

	return (
		<div
			ref={ref}
			className='absolute top-full left-0 mt-2 w-64 bg-zinc-800 rounded-lg shadow-lg z-50 overflow-hidden'
		>
			<div className='max-h-80 overflow-y-auto custom-scrollbar'>
				{items.map((item, index) => (
					<button
						key={index}
						className='w-full text-left px-4 py-3  transition-colors font-semibold text-zinc-400 hover:text-white cursor-pointer'
						onClick={() => onSelect(item)}
					>
						{item}
					</button>
				))}
			</div>
		</div>
	)
}
