import { useNavigate } from "react-router-dom";

import { authService } from "@/services/auth";

export const useDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.useLogout();
    navigate("/");
  };

  const dashboardStats = {
    users: 1234,
    revenue: 5678,
    orders: 90,
  };

  return {
    handleLogout,
    stats: dashboardStats,
  };
};
