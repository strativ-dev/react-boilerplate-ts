import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import store from '~/store';
import { LANGUAGE_OPTIONS } from '~/utils/constants';

export const useLang = () => {
	const { language, updateLanguage } = store().app;
	const { i18n } = useTranslation();

	useEffect(() => {
		i18n.changeLanguage(language);
	}, [i18n, language]);

	const handleChange = useCallback(
		(value: keyof typeof LANGUAGE_OPTIONS) => {
			i18n.changeLanguage(value);
			updateLanguage(value);
		},
		[i18n, updateLanguage]
	);

	return {
		language,
		handleChange,
	};
};
