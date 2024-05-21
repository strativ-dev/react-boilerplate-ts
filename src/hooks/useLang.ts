import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useAppStore from '@/store/useAppStore';
import { LANGUAGE_OPTIONS } from '@/utils/constants';

export const useLang = () => {
	const { i18n } = useTranslation();
	const language = useAppStore((state) => state.language);
	const updateLanguage = useAppStore((state) => state.updateLanguage);

	useEffect(() => {
		i18n.changeLanguage(language);
	}, [language]);

	const handleChange = useCallback((value: keyof typeof LANGUAGE_OPTIONS) => {
		i18n.changeLanguage(value);
		updateLanguage(value);
	}, []);

	return {
		language,
		handleChange,
	};
};
