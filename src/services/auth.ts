import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/useAuthStore";
import { axiosInstance } from "./api";

interface LoginCredentials {
  email: string;
  password: string;
}

export const authService = {
  // Login mutation
  useLogin() {
    return useMutation({
      mutationFn: async (credentials: LoginCredentials) => {
        const response = await axiosInstance.post("auth/login", credentials);
        const { token, user, permissions } = response.data;

        // Update auth store
        useAuthStore.getState().setToken(token);
        useAuthStore.getState().setUser(user);
        useAuthStore.getState().setPermissions(permissions);

        return response.data;
      },
    });
  },

  // Logout mutation
  useLogout() {
    // Clear local state immediately
    useAuthStore.getState().clear();
    // Optionally notify backend (fire-and-forget)
    axiosInstance.post("/logout").catch(() => {
      // Ignore errors since we're already logged out locally
      console.debug("Backend logout notification failed");
    });
  },
};

export default authService;
