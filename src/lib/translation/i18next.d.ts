import { en } from './locales/en';

export type translation = typeof en.translation;
export type translationKeys = keyof translation;

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      defaultNS: 'translation';
      translation: typeof en.translation;
    };
  }
}
