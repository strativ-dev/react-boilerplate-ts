import { Typography } from 'antd';

import {
  StyledCard,
  StatNumber,
} from '@/features/dashboard/styles/dashboard-styles';

const { Title } = Typography;

interface StatCardProps {
  title: string;
  value: string | number;
  prefix?: string;
}

export const StatCard = ({ title, value, prefix = '' }: StatCardProps) => {
  return (
    <StyledCard>
      <Title level={5}>{title}</Title>
      <StatNumber>
        {prefix}
        {value}
      </StatNumber>
    </StyledCard>
  );
};
