import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useAuthStore from '@/stores/useAuthStore';
import { useLogoutMutation } from '@/services/authentication';

export const HeaderUserNav = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common',
  });

  const user = useAuthStore((state) => state.user);

  const logout = useLogoutMutation();

  const menuItems: MenuProps = useMemo(() => {
    return {
      items: [
        {
          key: 'profile',
          label: user?.name,
          disabled: true,
        },
        {
          key: 'logout',
          label: t('logout'),
          onClick: logout,
        },
      ],
    };
  }, [logout, t, user?.name]);

  return (
    <Dropdown menu={menuItems} trigger={['click']} placement="bottomRight">
      <a
        onClick={(event) => {
          event.preventDefault();
        }}
      >
        <Avatar src={user?.avatar} icon={<UserOutlined />} size="large" />
      </a>
    </Dropdown>
  );
};
