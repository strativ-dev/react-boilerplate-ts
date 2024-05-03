import { Children, PropsWithChildren, cloneElement, isValidElement } from 'react';
import styled from 'styled-components';

import Badge from '../Atoms/Badge';
import BackButton from './BackButton';
import CancelButton from './CancelButton';
import SectionButton from './SectionButton';
import SectionSubTitle from './SectionSubTitle';
import SectionTitle from './SectionTitle';

interface HeaderProps {
	between?: boolean;
	marginBottom?: boolean;
	sticky?: boolean;
}

const Container = styled.div<HeaderProps>`
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

	${({ sticky = true }) => sticky && `position: sticky; top: -1.5rem; z-index: 10;`}
`;

const SectionHeader = ({ children, ...restProps }: PropsWithChildren<HeaderProps>) => {
	return (
		<Container {...restProps}>
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
