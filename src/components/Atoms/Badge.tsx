import { lighten } from 'polished';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface BadgeProps {
	noMargin?: boolean;
	isActive?: boolean;
}

const Badge = ({ children, ...restProps }: PropsWithChildren<BadgeProps>) => {
	return <BadgeWrapper {...restProps}>{children}</BadgeWrapper>;
};

const BadgeWrapper = styled.span<BadgeProps>`
	height: 28px;
	padding: 3px 8px;
	margin-top: ${(props) => (!props.noMargin ? '0.8rem' : '0')};
	font-weight: 500;
	font-size: 0.8rem;
	line-height: 20px;
	border-radius: 1rem;
	background-color: ${({ theme, isActive }) =>
		isActive ? lighten('.40', theme.colorPrimary) : theme.colorBgBase};

	border: 1px solid
		${({ theme, isActive }) => (isActive ? theme.colorPrimaryBorder : theme.colorBorder)};
	margin-left: ${(props) => (!props.noMargin ? '0.8rem' : '0')};
	color: ${({ theme, isActive }) => (isActive ? theme.colorPrimary : theme.colorTextBase)};
`;

export default Badge;
