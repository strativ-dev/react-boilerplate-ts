import { withAuth } from '@/components/hoc';
import { Layout } from 'antd';
import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LayoutHeader } from './LayoutHeader';
import { LayoutSider } from './LayoutSider';

const DashboardLayout: FC = withAuth(() => {
	const [isCollapsed, setCollapsed] = useState(false);

	const handleToggleCollapsed = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<Layout hasSider>
			<LayoutSider collapsed={isCollapsed} />
			<Layout style={{ height: '100vh' }}>
				<LayoutHeader collapsed={isCollapsed} onToggle={handleToggleCollapsed} />
				<Layout.Content style={{ padding: '1.5rem', overflowX: 'hidden' }}>
					<Outlet />
				</Layout.Content>
			</Layout>
		</Layout>
	);
});

export default DashboardLayout;
