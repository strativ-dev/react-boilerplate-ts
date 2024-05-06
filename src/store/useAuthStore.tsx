import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
	user: ProfileResponse | null;
	permissions: string[];
}

interface AuthActions {
	setUser: (payload: AuthState['user']) => void;
	setPermissions: (payload: string[]) => void;
	clear: () => void;
}

interface AuthStore extends AuthState, AuthActions {}

const initialState: Partial<AuthStore> = {
	user: null,
	permissions: [],
};

export const useAuthStore = create(
	persist<AuthStore>(
		(set, get) => ({
			...initialState,
			...get(),
			setUser: (payload: AuthState['user']) => {
				set({ user: payload });
			},
			setPermissions: (payload: string[]) => {
				set({ permissions: payload });
			},
			clear: () => set(initialState),
		}),
		{
			name: 'auth-store',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
