import { create } from 'zustand';

interface AuthState {
	user: ProfileResponse | null;
	permissions: string[];
	setUser: (user: AuthState['user']) => void;
	setPermissions: (permissions: AuthState['permissions']) => void;
	clear: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
	user: null,
	permissions: [],
	setUser: (user: AuthState['user']) => set({ user }),
	setPermissions: (permissions: AuthState['permissions']) => set({ permissions }),
	clear: () => set({ user: null, permissions: [] }),
}));

export default useAuthStore;
