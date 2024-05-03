import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { FC, createElement } from 'react';

import { LangPicker } from '~/components/Atoms';
import { LayoutHeaderWrapper } from '../styles';
import { BetaSwitch } from './BetaSwitch';
import { HeaderUserNav } from './HeaderUserNav';

type LayoutHeaderProps = {
	collapsed?: boolean;
	onToggle?: () => void;
};

export const LayoutHeader: FC<LayoutHeaderProps> = ({ collapsed, onToggle }) => {
	return (
		<LayoutHeaderWrapper className='shadow'>
			<Row align='middle' justify='space-between'>
				<Col>
					{createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: 'trigger',
						onClick: onToggle,
					})}
				</Col>
				<Col>
					<Row gutter={16}>
						<Col>
							<BetaSwitch />
						</Col>
						<Col>
							<LangPicker />
						</Col>
						<Col>
							<HeaderUserNav />
						</Col>
					</Row>
				</Col>
			</Row>
		</LayoutHeaderWrapper>
	);
};
