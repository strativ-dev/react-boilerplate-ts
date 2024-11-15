import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '@/features/authentication/components/LoginForm';
import {
  LoginWrapper,
  LoginCard,
} from '@/features/authentication/styles/login-styles';
import { LoginFormValues } from '@/features/authentication/types/login';
import { useLogin } from '@/services/auth';

const Login = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  const handleLogin = (values: LoginFormValues) => {
    mutate(values, {
      onSuccess: () => {
        message.success('Logged in successfully!');
        navigate('/dashboard');
      },
      onError: (error: Error) => {
        message.error(error.message || 'Invalid credentials');
      },
    });
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <LoginForm loading={isPending} onFinish={handleLogin} />
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
