import { usersAPI } from '@/libs/api';
import { useStoreSelector } from '@/store';
import { App, Button, Col, Form, Input, Row } from 'antd';
import { useAccessContext } from 'react-access-boundary';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

export const General = () => {
	const { t } = useTranslation();
	const { message } = App.useApp();
	const { user } = useStoreSelector((state) => state.auth);
	const { isAllowedTo } = useAccessContext();

	const { mutate: handleSubmit, isLoading } = useMutation(
		(values: Partial<API.UserUpdatePayload>) =>
			usersAPI.updateUser(user!.id, {
				...values,
				is_superuser: user?.is_superuser || false,
				is_staff: user?.is_staff || false,
				is_passenger: user?.is_passenger || false,
			}),
		{
			onMutate: (data) => {
				data.groups = user?.groups.map((group) => group.id);
				return data;
			},
			onSuccess: () => {
				message.success(t('Profile has been updated!'));
			},
			onError: (error: Error) => {
				message.error(error.message);
			},
		}
	);

	if (!user) return null;

	return (
		<Form layout='vertical' size='large' initialValues={user} onFinish={handleSubmit}>
			{/* <Form.Item
				label={t('Display picture')}
				name='avatar'
				valuePropName='filelist'
				className='dp-upload'
			>
				<AvatarUpload
					multiple={false}
					customRequest={() => {
						// setTimeout(() => {
						// 	onSuccess('ok');
						// }, 0);
					}}
					showUploadList={false}
				>
					<Avatar shape='circle' size={120} icon={<UserOutlined />} />
				</AvatarUpload>
			</Form.Item> */}
			<Form.Item
				label={t('First Name')}
				name='first_name'
				rules={[{ required: true, message: t('First name is required!') }]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label={t('Last Name')}
				name='last_name'
				rules={[{ required: true, message: t('Last name is required!') }]}
			>
				<Input />
			</Form.Item>
			<Form.Item name='email' label={t('Email Address')}>
				<Input disabled />
			</Form.Item>
			<Row align='middle'>
				<Col xs={24} md={12}>
					<Button
						block
						type='primary'
						htmlType='submit'
						loading={isLoading}
						disabled={!isAllowedTo('CHANGE_USER')}
					>
						{t('Save changes')}
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

// const AvatarUpload = styled(Upload)`
// 	.ant-avatar {
// 		position: relative;
// 		cursor: pointer;

// 		&::before {
// 			content: 'Change';
// 			font-size: 14px;
// 			position: absolute;
// 			left: 0;
// 			right: 0;
// 			bottom: 0;
// 			padding: 8px 0;
// 			text-align: center;
// 			line-height: 16px;
// 			background-color: ${({ theme }) => hexToRGB(theme.colors.primary, 0.15)};
// 			opacity: 0;
// 			transition: opacity 0.3s ease;
// 		}

// 		&:hover::before {
// 			opacity: 1;
// 		}
// 	}
// `;
