import { Tabs, TabsProps } from 'antd';
import { ComponentProps } from 'react';

type AntTabProps = ComponentProps<typeof Tabs>;

export type TabComponentProps = AntTabProps & {
	items: TabsProps['items'];
};

const SectionTabs = (props: TabComponentProps) => {
	return <Tabs {...props} />;
};

export default SectionTabs;
