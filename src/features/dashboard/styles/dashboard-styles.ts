import { Card, Row } from 'antd';
import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  padding: 24px;
`;

export const StyledCard = styled(Card)`
  text-align: center;

  .ant-card-body {
    padding: 24px;
  }
`;

export const StatNumber = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 8px;
  color: #1890ff;
`;

export const HeaderRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
