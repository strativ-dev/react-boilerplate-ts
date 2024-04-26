import { Children, PropsWithChildren, cloneElement, isValidElement } from 'react';
import styled from 'styled-components';

import Badge from '../atoms/Badge';
import BackButton from './BackButton';
import CancelButton from './CancelButton';
import SectionButton from './SectionButton';
import SectionSubTitle from './SectionSubTitle';
import SectionTitle from './SectionTitle';

interface HeaderProps {
	className?: string;
	between?: boolean;
	marginBottom?: boolean;
}

const Container = styled.div<{ between?: boolean; marginBottom?: boolean }>`
	background-color: ${({ theme }) => theme.colorBgBase};
	padding: 1.5rem;
	margin: -1.5rem -1.5rem 0 -1.5rem;

	${({ marginBottom }) => (marginBottom ? `margin-bottom: 1.5rem;` : `margin-bottom: 0.5rem;`)}

	${({ between }) =>
		between &&
		`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
`;

const SectionHeader = ({
	children,
	between = false,
	marginBottom = false,
}: PropsWithChildren<HeaderProps>) => {
	return (
		<Container between={between} marginBottom={marginBottom}>
			{Children.map(children, (child) => {
				if (isValidElement(child)) {
					return cloneElement(child);
				}

				return child;
			})}
		</Container>
	);
};

SectionHeader.Title = SectionTitle;
SectionHeader.SubTitle = SectionSubTitle;
SectionHeader.Back = BackButton;
SectionHeader.Cancel = CancelButton;
SectionHeader.Badge = Badge;
SectionHeader.Button = SectionButton;
SectionHeader.Actions = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
	return <div>{children}</div>;
};

export default SectionHeader;
