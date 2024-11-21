import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type ProfileResponse = {
  avatar: string;
  email: string;
  id: number;
  name: string;
  password: string;
  role: string;
  creationAt: string;
  updatedAt: string;
};

type AuthState = {
  user: ProfileResponse | null;
  permissions: string[];
  setUser: (user: AuthState['user']) => void;
  setPermissions: (permissions: AuthState['permissions']) => void;
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (accessToken: AuthState['accessToken']) => void;
  setRefreshToken: (refreshToken: AuthState['refreshToken']) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        permissions: [],
        setUser: (user: AuthState['user']) => set({ user }),
        setPermissions: (permissions: AuthState['permissions']) =>
          set({ permissions }),
        accessToken: null,
        refreshToken: null,
        setAccessToken: (accessToken: AuthState['accessToken']) =>
          set({ accessToken }),
        setRefreshToken: (refreshToken: AuthState['refreshToken']) =>
          set({ refreshToken }),
        clear: () => set({ user: null, permissions: [], accessToken: null }),
      }),
      { name: 'authStore' }
    ),
    { store: 'AuthStore', name: 'Auth Store' }
  )
);

export default useAuthStore;
