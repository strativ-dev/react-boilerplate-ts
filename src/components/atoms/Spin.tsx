import { Spin as AntSpin, ConfigProvider } from 'antd';
import { ComponentProps, FC } from 'react';
import styled from 'styled-components';

type AntSpinProps = ComponentProps<typeof AntSpin>;
export type SpinProps = AntSpinProps & {
	type?: 'window-centre' | 'content-centre';
	noColor?: boolean;
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

export const Spin: FC<SpinProps> = ({ type, noColor, className, ...rest }) => {
	const StyledComponent = type ? ComponentsMap[type] ?? AntSpin : AntSpin;
	return (
		<ConfigProvider
			theme={{
				token: noColor
					? {
							colorPrimary: '#CCC',
					  }
					: {},
			}}
		>
			<StyledComponent {...{ className, ...rest }} />
		</ConfigProvider>
	);
};
