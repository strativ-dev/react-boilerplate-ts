import { useCallback, useMemo } from 'react';

import useAppStore from '@/store/useAppStore';

const DEFAULT_LOCALE = 'sv-SE';

export const useFormatCurrency = (currencyCode?: string, locale?: string) => {
	const language = useAppStore((state) => state.language);
	const code = currencyCode;
	const currencyLocale = locale || language || DEFAULT_LOCALE;

	const formatter = useMemo(() => {
		if (!code) return null;
		try {
			return new Intl.NumberFormat(currencyLocale, {
				style: 'currency',
				currency: code,
				currencyDisplay: 'code',
				minimumFractionDigits: 0,
				maximumFractionDigits: 0,
			});
		} catch (error) {
			console.error(error);
		}
		return null;
	}, [code, currencyLocale]);

	const formatterFraction = useMemo(() => {
		if (!code) return null;
		try {
			return new Intl.NumberFormat(currencyLocale, {
				style: 'currency',
				currency: code,
				currencyDisplay: 'code',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
		} catch (error) {
			console.error(error);
		}
		return null;
	}, [code, currencyLocale]);

	const formatCurrency = useCallback(
		(amount?: number) => (code ? formatter?.format(amount || 0) || '' : amount?.toString() || ''),
		[formatter, code]
	);

	const formatCurrencyWithFraction = useCallback(
		(amount?: number) =>
			code ? formatterFraction?.format(amount || 0) || '' : amount?.toString() || '',
		[formatterFraction, code]
	);
	return { formatCurrency, formatCurrencyWithFraction };
};
