export const convertToCurrencyStyle = (amount: number, locale = 'sv-SE') => {
	return new Intl.NumberFormat(locale, {
		style: 'decimal',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};

export const convertToCurrency = (amount: number, currencyCode: string, locale = 'sv-SE') => {
	return `${new Intl.NumberFormat(locale, {
		style: 'decimal',
		currency: currencyCode,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount)} ${' '}${currencyCode}`;
};

export const convertToCurrencyFraction = (
	amount: number,
	currencyCode: string,
	locale = 'sv-SE'
) => {
	return `${amount
		.toLocaleString(locale, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})
		.replace(/\s/g, '\u00a0')
		.replace(/,/g, '.')}${' '}
  ${currencyCode}`;
};

export const getCurrencySymbol = (locale: string, currency: string) => {
	return (0)
		.toLocaleString(locale, {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		})
		.replace(/\d/g, '')
		.trim();
};
