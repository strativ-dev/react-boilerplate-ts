import { App, Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Brand, Typography } from '~/components/atoms';
import { authAPI } from '~/libs/api';

const ResetPassword = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { message } = App.useApp();
	const { id, token } = useParams() as { id: string; token: string };

	const { mutate: handleSubmit, isLoading } = useMutation(
		(values: ResetPasswordPayload) => authAPI.resetPassword({ ...values, uid: id, token }),
		{
			onMutate: ({ new_password, re_new_password }) => {
				if (!id || !token) {
					throw new Error(t('Something went wrong!'));
				}

				if (new_password !== re_new_password) {
					throw new Error(t('New password does not match!'));
				}
			},
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
			</FormHeader>

			<Form.Item
				label={t('New Password')}
				name='new_password'
				rules={[{ required: true, message: t('New password is required!') }]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				label={t('Confirm New Password')}
				name='re_new_password'
				rules={[{ required: true, message: t('Confirm new password is required!') }]}
			>
				<Input.Password />
			</Form.Item>

			<Button htmlType='submit' type='primary' loading={isLoading}>
				{t('Reset Password')}
			</Button>
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

export default ResetPassword;
