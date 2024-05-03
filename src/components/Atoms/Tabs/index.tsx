import { Tabs as AntTabs, TabsProps } from 'antd';
import React, { ComponentProps } from 'react';
import { TabWrapper } from './styles';

type AntTabProps = ComponentProps<typeof AntTabs>;

export type TabComponentProps = AntTabProps & {
	items: TabsProps['items'];
	fullWidth?: boolean;
	noWrapPadding?: boolean;
	noBg?: boolean;
	fullHeightContainer?: boolean;
};

export const Tabs: React.FC<TabComponentProps> = ({
	items,
	fullWidth = true,
	noWrapPadding = false,
	noBg = false,
	fullHeightContainer = false,
	...rest
}) => {
	return (
		<TabWrapper
			fullWidth={fullWidth}
			noWrapPadding={noWrapPadding}
			noBg={noBg}
			fullHeightContainer={fullHeightContainer}
		>
			<AntTabs {...rest} items={items} />
		</TabWrapper>
	);
};
