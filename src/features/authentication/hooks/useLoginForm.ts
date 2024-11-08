import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import { authService } from "@/services/auth";
import { LoginFormValues } from "@/features/authentication/types/login";

export const useLoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const login = authService.useLogin();

  const handleLogin = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      await login.mutateAsync(values);
      message.success("Login successful!");
      navigate("/dashboard");
    } catch (error: unknown) {
      message.error(
        error instanceof Error ? error.message : "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
  };
};
