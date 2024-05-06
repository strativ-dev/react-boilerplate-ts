import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import config from '../config';

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

const initialState: Partial<AppStore> = {
	isLoaded: false,
	routeChange: 'complete',
	language: 'sv',
	currencyID: 2,
	primaryColor: config.themeColorCode,
	minBookingFee: config.minBookingFee,
	secondPaymentFee: config.secondPaymentFee,
	isBetaMode: true,
	bankGiro: null,
	invoicePaymentDays: null,
	darkMode: false,
	compactMode: false,
};

export const useAppStore = create(
	persist<AppStore>(
		(set, get) => ({
			...initialState,
			...get(),
			completeLoader: () => set({ isLoaded: true }),
			updateRoute: (payload: AppState['routeChange']) => {
				set({
					routeChange: payload,
				});
			},
			updateLanguage: (payload: AppState['language']) => {
				set({ language: payload });
			},
			updateCurrency: (payload: AppState['currencyID']) => {
				set({ currencyID: payload });
			},
			updatePrimaryColor: (payload: AppState['primaryColor']) => {
				set({ primaryColor: payload });
			},
			updateMinBookingFee: (payload: AppState['minBookingFee']) => {
				set({ minBookingFee: payload == 0 ? config.minBookingFee : payload });
			},
			updateSecondPaymentFee: (payload: AppState['secondPaymentFee']) => {
				set({ secondPaymentFee: payload });
			},
			updateBetaMode: (payload: AppState['isBetaMode']) => {
				set({ isBetaMode: payload });
			},
			updateBankGiro: (payload: AppState['bankGiro']) => {
				set({ bankGiro: payload });
			},
			updateInvoicePaymentDays: (payload: AppState['invoicePaymentDays']) => {
				set({ invoicePaymentDays: payload });
			},
			updateDarkMode: (payload: AppState['darkMode']) => {
				set({ darkMode: payload });
			},
			updateCompactMode: (payload: AppState['compactMode']) => {
				set({ compactMode: payload });
			},
		}),
		{
			name: 'app-store',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
