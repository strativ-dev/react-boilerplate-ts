import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { FormTitle } from '@/features/authentication/styles/login-styles';
import { LoginFormValues } from '@/features/authentication/types/login';

interface LoginFormProps {
  loading: boolean;
  onFinish: (values: LoginFormValues) => void;
}

export const LoginForm = ({ loading, onFinish }: LoginFormProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.authentication',
  });

  return (
    <>
      <FormTitle>{t('authentication')}</FormTitle>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t('please_input_your_email') },
            { type: 'email', message: t('please_input_your_email') },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder={t('email')} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: t('please_input_your_password') }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t('password')}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {t('log_in')}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
