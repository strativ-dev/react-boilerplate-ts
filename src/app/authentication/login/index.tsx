import React from "react";

import { LoginForm } from "@/features/authentication/components/LoginForm";
import {
  LoginWrapper,
  LoginCard,
} from "@/features/authentication/styles/login-styles";
import { useLoginForm } from "@/features/authentication/hooks/useLoginForm";

const Login = () => {
  const { loading, handleLogin } = useLoginForm();

  return (
    <LoginWrapper>
      <LoginCard>
        <LoginForm loading={loading} onFinish={handleLogin} />
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
