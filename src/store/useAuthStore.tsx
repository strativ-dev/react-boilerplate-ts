import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
