import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
	user: ProfileResponse | null;
	permissions: string[];
	setUser: (user: AuthState['user']) => void;
	setPermissions: (permissions: AuthState['permissions']) => void;
	clear: () => void;
}

export const useAuthStore = create<AuthState>()(devtools((set) => ({
	user: null,
	permissions: [],
	setUser: (user: AuthState['user']) => set({ user }),
	setPermissions: (permissions: AuthState['permissions']) => set({ permissions }),
	clear: () => set({ user: null, permissions: [] }),
}), {store: 'AuthStore', name: 'Auth Store'}));

export default useAuthStore;
