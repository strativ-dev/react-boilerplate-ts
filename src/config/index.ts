export default {
	siteName: 'React Boilerplate',
	lang: 'sv',
	dev: import.meta.env.DEV,
	baseURL: import.meta.env.BASE_URL,
	apiURL: import.meta.env.VITE_BACKEND_API_URL,
	sentryDSN: import.meta.env.VITE_SENTRY_DSN,
	sentryEnv: import.meta.env.VITE_SENTRY_ENV,
	itemsPerPage: 10,
	itemsPerPageMax: 9999,
	dateFormat: 'YYYY-MM-DD',
	dateFormatReadable: 'MMM D, YYYY',
	dateTimeFormatReadable: 'MMM D YYYY, HH:mm',
	dateTimeFormatReadableAmPm: 'MMM D YYYY, HH:mm A',
	themeColorCode: '#20519E',
	minBookingFee: 30,
	secondPaymentFee: 0,
};
