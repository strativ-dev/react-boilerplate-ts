import config from '@/config';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
	isLoaded: boolean;
	routeChange: 'start' | 'complete' | 'error';
	language: 'en' | 'sv';
	primaryColor: string;
	isBetaMode: boolean;
	darkMode: boolean;
	compactMode: boolean;
	completeLoader: () => void;
	updateRoute: (routeChange: AppState['routeChange']) => void;
	updateLanguage: (language: AppState['language']) => void;
	updatePrimaryColor: (primaryColor: AppState['primaryColor']) => void;
	updateBetaMode: (isBetaMode: AppState['isBetaMode']) => void;
	updateDarkMode: (darkMode: AppState['darkMode']) => void;
	updateCompactMode: (compactMode: AppState['compactMode']) => void;
}

const useAppStore = create<AppState>()(devtools(persist((set) => ({
	isLoaded: false,
	routeChange: 'complete',
	language: 'sv',
	primaryColor: config.themeColorCode,
	isBetaMode: true,
	darkMode: false,
	compactMode: false,
	completeLoader: () => set({isLoaded: true}),
	updateRoute: (routeChange: AppState['routeChange']) => set({ routeChange }),
	updateLanguage: (language: AppState['language']) => set({ language }),
	updatePrimaryColor: (primaryColor: AppState['primaryColor']) => set({ primaryColor }),
	updateBetaMode: (isBetaMode: AppState['isBetaMode']) => set({ isBetaMode }),
	updateDarkMode: (darkMode: AppState['darkMode']) => set({ darkMode }),
	updateCompactMode: (compactMode: AppState['compactMode']) => set({ compactMode }),
}), {name: 'appStore'}), {store: 'AppStore', name: 'App Store'}));

export default useAppStore;