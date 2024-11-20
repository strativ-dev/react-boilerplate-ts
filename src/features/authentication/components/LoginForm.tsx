import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { FormTitle } from '@/features/authentication/styles/login-styles';
import { LoginFormValues } from '@/features/authentication/types/login';

type FormValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  loading: boolean;
  onFinish: (values: LoginFormValues) => void;
};

export const LoginForm = ({ loading, onFinish }: LoginFormProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'features.authentication',
  });

  const [form] = Form.useForm<FormValues>();

  return (
    <>
      <FormTitle>{t('authentication')}</FormTitle>
      <Form
        form={form}
        name="login"
        initialValues={{
          email: 'john@mail.com',
          password: 'changeme',
        }}
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
