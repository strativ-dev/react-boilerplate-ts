import { LoginForm } from '@/features/authentication/components/LoginForm';
import {
  LoginWrapper,
  LoginCard,
} from '@/features/authentication/styles/login-styles';
import { useLoginMutation } from '@/services/authentication';

const Login = () => {
  const loginMutation = useLoginMutation();

  return (
    <LoginWrapper>
      <LoginCard>
        <LoginForm
          loading={loginMutation.isPending}
          onFinish={(values) => {
            loginMutation.mutate(values);
          }}
        />
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
