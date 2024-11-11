import { Row, Col } from "antd";

import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { DashboardWrapper } from "@/features/dashboard/styles/dashboard-styles";

const DashboardHome = () => {
  const { handleLogout, stats } = useDashboard();

  return (
    <DashboardWrapper>
      <DashboardHeader onLogout={handleLogout} />

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <StatCard title="Users" value={stats.users} />
        </Col>

        <Col xs={24} md={8}>
          <StatCard title="Revenue" value={stats.revenue} prefix="$" />
        </Col>

        <Col xs={24} md={8}>
          <StatCard title="Orders" value={stats.orders} />
        </Col>
      </Row>
    </DashboardWrapper>
  );
};

export default DashboardHome;
