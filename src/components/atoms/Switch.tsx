import { Switch as AntSwitch } from 'antd';
import { ComponentProps, FC } from 'react';
import styled from 'styled-components';

type AntSwitchProps = ComponentProps<typeof AntSwitch>;

export type SwitchProps = AntSwitchProps & {
	custom?: boolean;
};

const CustomSwitch = styled(AntSwitch)`
	&-inner {
		font-size: 0.875rem;
		font-weight: 500;
		color: ${({ theme }) => theme.colorText};
		margin: 0 0.3125rem 0 1.9375rem;
		text-transform: uppercase;
	}
`;

export const Switch: FC<SwitchProps> = ({ custom, ...rest }) => {
	return custom ? <CustomSwitch {...rest} /> : <AntSwitch {...rest} />;
};
