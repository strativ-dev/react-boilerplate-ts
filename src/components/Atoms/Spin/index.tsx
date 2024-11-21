import { Spin as AntSpin } from 'antd';
import { ComponentProps } from 'react';
import styled from 'styled-components';

type AntSpinProps = ComponentProps<typeof AntSpin>;

export type SpinProps = AntSpinProps & {
  type?: 'window-centre' | 'content-centre';
};

const WindowCenterSpin = styled(AntSpin)<SpinProps>`
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 16px);
`;

const ContentCenterSpin = styled(AntSpin)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ComponentsMap = {
  'window-centre': WindowCenterSpin,
  'content-centre': ContentCenterSpin,
};

export const Spin = ({ type, className, ...rest }: SpinProps) => {
  const StyledComponent = type ? (ComponentsMap[type] ?? AntSpin) : AntSpin;

  return <StyledComponent {...{ className, ...rest }} />;
};
