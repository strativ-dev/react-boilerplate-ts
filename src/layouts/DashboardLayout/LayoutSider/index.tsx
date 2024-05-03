import { Layout, Menu } from 'antd';
import { FC, HTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Brand } from '~/components/Atoms';
import { MenuItems } from './MenuItems';

type LayoutSiderProps = {
	collapsed?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const MenuWrapper = styled.div`
	max-height: calc(100vh - 130px);
	overflow: hidden;
	overflow-y: auto;
	::-webkit-scrollbar {
		width: 0.4rem;
	}
	::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.1);
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: ${(props) => props.theme.colorPrimaryBgHover};
	}
	.ant-menu-item,
	.ant-menu-submenu {
		svg {
			opacity: 0.75;
		}
	}
`;

export const LayoutSider: FC<LayoutSiderProps> = (props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const menuRef = useRef(null);
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	const selectedKeys = useMemo(() => {
		const paths = location.pathname.split('/')?.filter((item) => item !== 'dashboard');
		return paths?.length > 1 ? paths?.filter((path) => path !== '') : paths;
	}, [location.pathname]);

	const getOpenedKey = useCallback(() => {
		const paths = location.pathname.split('/')?.filter((item) => item !== 'dashboard');
		return paths?.length > 1 ? paths?.filter((path) => path !== '').shift() : paths.shift();
	}, [location.pathname]);

	const handleMenuClick = ({ keyPath }: { keyPath: string[] }) =>
		navigate(`${keyPath?.reverse().join('/')}`);

	const handleOpenChange = (keys: string[]) => {
		setOpenKeys((current) => (current.at(-1) === keys?.at(-1) ? [] : [keys?.at(-1) ?? '']));
	};

	useEffect(() => {
		setOpenKeys([getOpenedKey() ?? '']);
	}, [getOpenedKey]);

	return (
		<Layout.Sider {...props} theme={'light'} width={232}>
			<Brand />
			<MenuWrapper>
				<Menu
					mode='inline'
					defaultSelectedKeys={selectedKeys}
					openKeys={openKeys}
					onClick={handleMenuClick}
					onOpenChange={handleOpenChange}
					items={MenuItems()}
					ref={menuRef}
				/>
			</MenuWrapper>
		</Layout.Sider>
	);
};
