import translation from 'public/locales/en/translation.json';
import translationWidget from 'public/widget/locales/en/translationWidget.json';

export type translation = typeof translation;
export type translationKeys = keyof translation;

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'translation';
		resources: {
			translation: typeof translation;
			translationWidget: typeof translationWidget;
		};
	}
}
