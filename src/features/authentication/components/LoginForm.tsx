import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import { FormTitle } from '@/features/authentication/styles/login-styles';
import { LoginFormValues } from '@/features/authentication/types/login';

interface LoginFormProps {
  loading: boolean;
  onFinish: (values: LoginFormValues) => void;
}

export const LoginForm = ({ loading, onFinish }: LoginFormProps) => {
  return (
    <>
      <FormTitle>Welcome Back</FormTitle>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
