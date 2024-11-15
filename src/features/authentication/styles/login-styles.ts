import { Card } from 'antd';
import styled from 'styled-components';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

export const LoginCard = styled(Card)`
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  color: #1890ff;
`;
