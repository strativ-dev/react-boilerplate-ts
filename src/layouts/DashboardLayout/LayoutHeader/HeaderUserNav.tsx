import { CompressOutlined, ExpandOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Dropdown, MenuProps, Space, Switch, message } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

import { usersAPI } from '@/libs/api';
import { authService } from '@/libs/auth';
import { PRIVATE_ROUTES } from '@/routes/paths';
import useAppStore from '@/store/useAppStore';
import { useShallow } from 'zustand/react/shallow';

export const HeaderUserNav = () => {
	const { t } = useTranslation();
	const { darkMode, compactMode, updateDarkMode, updateCompactMode } = useAppStore(
		useShallow((state) => state)
	);

	const { mutate: handleLogout } = useMutation(() => usersAPI.logout(), {
		onSuccess: () => {
			authService.removeTokens();
			window.location.href = '/';
		},
		onError: (error: Error) => {
			message.error(error.message);
		},
	});

	const toggleDarkMode = useCallback((checked: boolean) => updateDarkMode(checked), []);

	const toggleCompactMode = useCallback((checked: boolean) => updateCompactMode(checked), []);

	const menuItems: MenuProps = useMemo(() => {
		return {
			items: [
				{
					key: 'profile',
					label: <Link to={PRIVATE_ROUTES.PROFILE}>{t('Your profile')}</Link>,
				},
				{
					key: 'change-password',
					label: <Link to={`${PRIVATE_ROUTES.PROFILE}?type=password`}>{t('Change password')}</Link>,
				},
				{
					key: 'sign-out',
					label: t('Sign out'),
				},
				{
					key: 'divider',
					label: <Divider style={{ margin: 0 }} />,
				},
				{
					key: 'view-mode',
					label: (
						<Space>
							<Switch
								size='default'
								checkedChildren={<MdOutlineLightMode />}
								unCheckedChildren={<MdOutlineDarkMode />}
								checked={darkMode}
								onChange={toggleDarkMode}
							/>
							<Switch
								checkedChildren={<ExpandOutlined />}
								unCheckedChildren={<CompressOutlined />}
								checked={compactMode}
								onChange={toggleCompactMode}
							/>
						</Space>
					),
				},
			],
			onClick: (info: MenuInfo) => {
				if (info?.key === 'sign-out') {
					handleLogout();
				}
			},
		};
	}, [handleLogout, t, darkMode, toggleDarkMode, toggleCompactMode, compactMode]);

	return (
		<Dropdown menu={menuItems} trigger={['click']} placement='bottomRight'>
			<a className='ant-dropdown-link' onClick={(e) => e.preventDefault()}>
				<Avatar size='large' icon={<UserOutlined />} />
			</a>
		</Dropdown>
	);
};
