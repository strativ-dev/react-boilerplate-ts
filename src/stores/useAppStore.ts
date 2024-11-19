import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  language: 'en' | 'sv';
  setLanguage: (language: AppState['language']) => void;
}

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        language: 'sv',
        setLanguage: (language) => set({ language }),
      }),
      { name: 'appStore' }
    ),
    { store: 'AppStore', name: 'App Store' }
  )
);

export default useAppStore;
