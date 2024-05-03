import { Tabs as AntTabs, TabsProps } from 'antd';
import React, { ComponentProps } from 'react';
import styled from 'styled-components';

const TabWrapper = styled.div<{
	fullWidth?: boolean;
	noWrapPadding?: boolean;
	noBg?: boolean;
	fullHeightContainer?: boolean;
}>`
	${({ fullHeightContainer }) =>
		fullHeightContainer &&
		`
   		height: calc(100% - 39px);
  `}
	.ant-tabs-top {
		${({ fullHeightContainer }) =>
			fullHeightContainer &&
			`
				min-height: 100%;
		`}
	}
	.ant-tabs-tab {
		font-size: 0.85rem;
		font-weight: 600;
		padding: 0.75rem 0.75rem;
		margin: 0rem !important;
		color: ${(props) => props.theme.colorTextTertiary};
		&-active {
			background-color: ${(props) => props.theme.colorPrimaryBg};
		}
	}
	.ant-tabs-nav-wrap {
		padding-left: ${(props) => (!props.noWrapPadding ? '1.5rem' : '')};
		background-color: ${(props) => (!props.noBg ? props.theme.colorBgBase : '')};
	}
	.ant-tabs-content-holder {
		padding: ${(props) => (props.fullWidth ? '0 1.5rem 1.5rem !important' : '')};
	}
	margin: ${(props) => (props.fullWidth ? '-1.5rem !important' : '')};
	.title-wrapper {
		background-color: ${(props) => props.theme.colorBgBase};
	}

	.ant-tabs-nav {
		border-bottom: 1px solid ${(props) => props.theme.colorBorder};
	}
`;

type AntTabProps = ComponentProps<typeof AntTabs>;
export type TabComponentProps = AntTabProps & {
	items: TabsProps['items'];
	fullWidth?: boolean;
	noWrapPadding?: boolean;
	noBg?: boolean;
	fullHeightContainer?: boolean;
};

const Tabs: React.FC<TabComponentProps> = ({
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

export default Tabs;
