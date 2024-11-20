import { Row, Col } from 'antd';

import { StatCard } from '@/features/dashboard/components/StatCard';

const DashboardHome = () => {
  const dashboardStats = {
    users: 1234,
    revenue: 5678,
    orders: 90,
  };

  return (
    <Row gutter={[24, 24]}>
      <Col xs={24} md={8}>
        <StatCard title="Users" value={dashboardStats.users} />
      </Col>

      <Col xs={24} md={8}>
        <StatCard title="Revenue" value={dashboardStats.revenue} prefix="$" />
      </Col>

      <Col xs={24} md={8}>
        <StatCard title="Orders" value={dashboardStats.orders} />
      </Col>
    </Row>
  );
};

export default DashboardHome;
