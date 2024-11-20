import { Row, Col, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { StatCard } from '@/features/dashboard/components/StatCard';
import { useAuthStore } from '@/stores/useAuthStore';

const dashboardStats = {
  users: 1234,
  revenue: 5678,
  orders: 90,
};
const DashboardHome = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'pages.dashboard',
  });

  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Row style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            {t('welcome', { name: user?.name })}
          </Typography.Title>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <StatCard title={t('users')} value={dashboardStats.users} />
        </Col>

        <Col xs={24} md={8}>
          <StatCard
            title={t('revenue')}
            value={dashboardStats.revenue}
            prefix="$"
          />
        </Col>

        <Col xs={24} md={8}>
          <StatCard title={t('orders')} value={dashboardStats.orders} />
        </Col>
      </Row>
    </>
  );
};

export default DashboardHome;
