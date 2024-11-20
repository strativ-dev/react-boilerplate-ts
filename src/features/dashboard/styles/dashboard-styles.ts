import { Card, Row } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  text-align: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  .ant-card-body {
    padding: 24px;
  }
`;

export const StatNumber = styled.div`
  font-size: 28px;
  font-weight: bold;
  margin-top: 8px;
  color: ${(props) => props.theme.colorPrimary};
`;

export const HeaderRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
