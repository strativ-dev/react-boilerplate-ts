import { Button, Typography } from "antd";

import { HeaderRow } from "@/features/dashboard/styles/dashboard-styles";

const { Title } = Typography;

interface DashboardHeaderProps {
  onLogout: () => void;
}

export const DashboardHeader = ({ onLogout }: DashboardHeaderProps) => {
  return (
    <HeaderRow>
      <Title level={4}>Dashboard</Title>
      <Button type="primary" onClick={onLogout}>
        Logout
      </Button>
    </HeaderRow>
  );
};
