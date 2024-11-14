import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { StatCard } from "@/features/dashboard/components/StatCard";
import { DashboardWrapper } from "@/features/dashboard/styles/dashboard-styles";
import { useLogout } from "@/services/auth";

const DashboardHome = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // This would typically come from an API call using something like this with useQuery
  // const { data: dashboardStats } = useQuery({
  //   queryKey: ['dashboard-stats'],
  //   queryFn: () => api.getDashboardStats(),
  //   defaultData: {
  //     users: 0,
  //     revenue: 0,
  //     orders: 0,
  //   }
  // });
  const dashboardStats = {
    users: 1234,
    revenue: 5678,
    orders: 90,
  };

  return (
    <DashboardWrapper>
      <DashboardHeader onLogout={handleLogout} />

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
    </DashboardWrapper>
  );
};

export default DashboardHome;
