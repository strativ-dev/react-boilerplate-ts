import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from './locales/en';
import { sv } from './locales/sv';
import useAppStore from '@/stores/useAppStore';

const resources = {
  en,
  sv,
};
const languageStoreState = useAppStore.getState();
const language = languageStoreState.language;

void i18n.use(initReactI18next).init({
  resources,
  lng: language ?? 'sv',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
