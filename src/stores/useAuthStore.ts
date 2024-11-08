import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ProfileResponse {
  id: number;
  last_login: Date;
  is_superuser: boolean;
  created_by?: string;
  updated_by?: string;
  first_name: string;
  last_name: string;
  email: string;
  user_permissions: string[];
}

interface AuthState {
  user: ProfileResponse | null;
  permissions: string[];
  setUser: (user: AuthState["user"]) => void;
  setPermissions: (permissions: AuthState["permissions"]) => void;
  token: string | null;
  setToken: (token: AuthState["token"]) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        permissions: [],
        setUser: (user: AuthState["user"]) => set({ user }),
        setPermissions: (permissions: AuthState["permissions"]) =>
          set({ permissions }),
        token: null,
        setToken: (token: AuthState["token"]) => set({ token }),
        clear: () => set({ user: null, permissions: [], token: null }),
      }),
      { name: "authStore" }
    ),
    { store: "AuthStore", name: "Auth Store" }
  )
);

export default useAuthStore;
