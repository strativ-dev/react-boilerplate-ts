import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Menu, theme } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { HeaderUserNav } from './HeaderUserNav';
import MenuItems from './MenuItems';
import { StyledHeader } from './styles';
import StrativLogo from '@/assets/logo.svg?react';

import { LangPicker } from '@/components/Atoms/LangPicker';
import { withAuth } from '@/components/Hoc/withAuth';

const { Sider, Content } = Layout;

const DashboardLayout = withAuth(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedKeys = useMemo(() => {
    const paths = location.pathname.split('/');
    return paths?.length > 1 ? paths?.filter(Boolean) : paths;
  }, [location.pathname]);

  const getOpenedKey = useCallback(() => {
    const paths = location.pathname.split('/');

    if (paths.length === 1) {
      return paths.shift();
    }

    return paths?.filter(Boolean).shift();
  }, [location.pathname]);

  const handleMenuClick = ({ keyPath }: { keyPath: string[] }) => {
    const updatedKeyPath = keyPath?.reverse().join('/');

    return navigate(updatedKeyPath);
  };

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  useEffect(() => {
    setOpenKeys([getOpenedKey() ?? '']);
  }, [getOpenedKey]);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: '100vh' }}
      >
        <Flex justify="center" align="center">
          <StrativLogo height={40} width={40} />
        </Flex>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
          items={MenuItems()}
        />
      </Sider>
      <Layout>
        <StyledHeader style={{ background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            size="large"
          />

          <Flex align="center" justify='end' gap={16}>
            <LangPicker />
            <HeaderUserNav />
          </Flex>
        </StyledHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
});

export default DashboardLayout;
