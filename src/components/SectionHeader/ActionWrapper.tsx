import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ActionWrapperProps {
	between?: boolean;
}

const Wrapper = styled.div<ActionWrapperProps>`
	display: flex;

	${({ between }) =>
		between &&
		`
    justify-content: space-between;
    align-items: center;
  `}
`;

const ActionWrapper = ({ children, between }: PropsWithChildren<ActionWrapperProps>) => {
	return <Wrapper between={between}>{children}</Wrapper>;
};

export default ActionWrapper;
