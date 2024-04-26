import React from 'react';
import styled from 'styled-components';

const SubTitle = styled.p`
	font-size: 0.875rem;
	font-weight: 400;
	line-height: 1.5;
	color: ${({ theme }) => theme.colorTextTertiary};
	margin-top: 0;
	margin-bottom: 0;
`;

interface Props {
	children: React.ReactNode;
}

const SectionSubTitle = ({ children }: Props) => {
	return <SubTitle>{children}</SubTitle>;
};

export default SectionSubTitle;
