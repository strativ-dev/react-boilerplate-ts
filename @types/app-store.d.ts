interface AppState {
	isLoaded: boolean;
	routeChange: 'start' | 'complete' | 'error';
	language: 'en' | 'sv';
	currencyID: number;
	primaryColor: string;
	minBookingFee: number;
	secondPaymentFee: number;
	isBetaMode: boolean;
	bankGiro: string | null;
	invoicePaymentDays: number | null;
	darkMode: boolean;
	compactMode: boolean;
	completeLoader: () => void;
}

interface AppActions {
	updateRoute: (payload: AppState['routeChange']) => void;
	updateLanguage: (payload: AppState['language']) => void;
	updateCurrency: (payload: AppState['currencyID']) => void;
	updatePrimaryColor: (payload: AppState['primaryColor']) => void;
	updateMinBookingFee: (payload: AppState['minBookingFee']) => void;
	updateSecondPaymentFee: (payload: AppState['secondPaymentFee']) => void;
	updateBetaMode: (payload: AppState['isBetaMode']) => void;
	updateBankGiro: (payload: AppState['bankGiro']) => void;
	updateInvoicePaymentDays: (payload: AppState['invoicePaymentDays']) => void;
	updateDarkMode: (payload: AppState['darkMode']) => void;
	updateCompactMode: (payload: AppState['compactMode']) => void;
}

interface AppStore extends AppState, AppActions {}
