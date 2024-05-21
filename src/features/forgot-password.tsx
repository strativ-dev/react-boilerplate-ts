import { App, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Brand, Typography } from '@/components/Atoms';
import { authAPI } from '@/libs/api';

const ForgotPassword = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { message } = App.useApp();

	const { mutate: handleSubmit, isLoading } = useMutation(
		(values: { email: string }) => authAPI.forgotPassword(values.email),
		{
			onSuccess: ({ detail }) => {
				navigate('/');
				message.success(detail);
			},
			onError: (error: Error) => {
				message.error(error.message);
			},
		}
	);

	return (
		<Form name='signIn' layout='vertical' onFinish={handleSubmit} autoComplete='off' size='large'>
			<FormHeader>
				<Brand />
				<Typography.Title level={3} type='primary' noMargin>
					{t('Reset Password')}
				</Typography.Title>
				<Typography.Text>
					{t('An email will be sent to this address with a password reset activation link')}
				</Typography.Text>
			</FormHeader>

			<Form.Item
				label={t('Email')}
				name='email'
				rules={[
					{ required: true, message: t('Email address is required!') },
					{ type: 'email', message: t('Email address is invalid!') },
				]}
			>
				<Input placeholder={t('Email Address')} />
			</Form.Item>

			<ButtonWrapper>
				<Button htmlType='submit' type='primary' loading={isLoading}>
					{t('Send Reset Link')}
				</Button>
				<Link to='/'>{t('Back to Sign in')}</Link>
			</ButtonWrapper>
		</Form>
	);
};

export const FormHeader = styled.div`
	width: 100%;
	display: block;
	text-align: center;
	margin-bottom: 2rem;

	& > h3.ant-typography {
		margin-top: 1rem;
	}

	& > span.ant-typography {
		font-size: 1.125rem;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 0.5rem;
`;

export default ForgotPassword;
