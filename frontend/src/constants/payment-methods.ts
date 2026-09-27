export const METHOD_STYLES: Record<string, { bg: string; textColor?: string }> =
	{
		mir: { bg: 'bg-[#1EA34A]', textColor: 'text-white' },
		visa: { bg: 'bg-[#0A66FF]', textColor: 'text-white' },
		mastercard: { bg: 'bg-black', textColor: 'text-white' },
		amex: { bg: 'bg-[#2E77BB]', textColor: 'text-white' },
		jcb: { bg: 'bg-[#0F4FA8]', textColor: 'text-white' },
		unionpay: { bg: 'bg-[#185C97]', textColor: 'text-white' },
		unknown: { bg: 'bg-gray-700', textColor: 'text-white' }
	}

export const METHOD_LABELS: Record<string, string> = {
	mir: 'МИР',
	visa: 'Visa',
	mastercard: 'MasterCard',
	amex: 'American Express',
	jcb: 'JCB',
	unionpay: 'UnionPay',
	unknown: 'Unknown'
}
