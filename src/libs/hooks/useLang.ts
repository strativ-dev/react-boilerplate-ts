import { useStoreDispatch, useStoreSelector } from '@/store';
import { appActions } from '@/store/actions';
import { LANGUAGE_OPTIONS } from '@/utils/constants';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLang = () => {
	const { language } = useStoreSelector((state) => state.app);
	const dispatch = useStoreDispatch();
	const { i18n } = useTranslation();

	useEffect(() => {
		i18n.changeLanguage(language);
	}, [i18n, language]);

	const handleChange = useCallback(
		(value: keyof typeof LANGUAGE_OPTIONS) => {
			i18n.changeLanguage(value);
			dispatch(appActions.updateLanguage(value));
		},
		[dispatch, i18n]
	);

	return {
		language,
		handleChange,
	};
};
