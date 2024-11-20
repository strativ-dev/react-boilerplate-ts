import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { LANGUAGE_OPTIONS } from '@/lib/utils/constants';
import useAppStore from '@/stores/useAppStore';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const handleChange = useCallback(
    (value: keyof typeof LANGUAGE_OPTIONS) => {
      i18n.changeLanguage(value);
      setLanguage(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    language,
    handleChange,
  };
};
