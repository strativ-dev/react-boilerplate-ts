import { en } from "./locales/en";


declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      defaultNS: 'translation';
      translation: typeof en.translation;
    };
  }
}
