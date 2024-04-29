import { Col, Row } from 'antd';

import { Users } from './users';

const AdminDashboard = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
			<Row gutter={16}>
				<Col span={24}>
					<Users />
				</Col>
			</Row>
		</div>
	);
};

export default AdminDashboard;
