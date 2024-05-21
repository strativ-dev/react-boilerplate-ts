import { App, Button, Col, Form, Input, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { usersAPI } from '@/libs/api';

type FormValues = {
	current_password: string;
	new_password: string;
	re_new_password: string;
};

const UpdatePassword = () => {
	const { t } = useTranslation();
	const { message } = App.useApp();

	const { mutate: handleSubmit, isLoading } = useMutation(
		({ current_password, new_password }: FormValues) =>
			usersAPI.updatePassword(current_password, new_password),
		{
			onMutate: ({ new_password, re_new_password }) => {
				if (new_password !== re_new_password) {
					throw new Error(t('New password does not match!'));
				}
			},
			onSuccess: () => {
				message.success(t('Password has been updated!'));
			},
			onError: (error: Error) => {
				message.error(error.message);
			},
		}
	);

	return (
		<Form layout='vertical' size='large' onFinish={handleSubmit}>
			<Form.Item
				label={t('Current Password')}
				name='current_password'
				rules={[{ required: true, message: t('Current passowrd is required!') }]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				label={t('New Password')}
				name='new_password'
				rules={[
					{ required: true, message: t('New password is required!') },
					() => ({
						validator(_, value) {
							if (!!value && value.length < 8) {
								return Promise.reject(new Error(t('New password must be at least 8 characters!')));
							}

							return Promise.resolve();
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				label={t('Confirm New Password')}
				name='re_new_password'
				rules={[
					{ required: true, message: t('Confirm new password is required!') },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('new_password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error(t('New password does not match!')));
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>
			<Row align='middle'>
				<Col xs={24} md={12}>
					<Button block type='primary' htmlType='submit' loading={isLoading}>
						{t('Save changes')}
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

export default UpdatePassword;
