import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  language: 'en' | 'sv';
  primaryColor: string;
  setLanguage: (language: AppState['language']) => void;
  setPrimaryColor: (primaryColor: AppState['primaryColor']) => void;
}

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        language: 'en',
        primaryColor: '#f55a06',
        setLanguage: (language) => set({ language }),
        setPrimaryColor: (primaryColor) => set({ primaryColor }),
      }),
      { name: 'appStore' }
    ),
    { store: 'AppStore', name: 'App Store' }
  )
);

export default useAppStore;
