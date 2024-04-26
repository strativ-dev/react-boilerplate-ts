import { Typography } from '@/components/atoms';
import { Card, Col, Row, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { General } from './General';
import { UpdatePassword } from './UpdatePassword';

export const Profile = () => {
	const [activeTab, setActiveTab] = useState('general');
	const { t } = useTranslation();
	const { search } = useLocation();

	useEffect(() => {
		setActiveTab(search.includes('?type=password') ? 'password' : 'general');
	}, [search]);

	return (
		<Row>
			<Col span={24} className='margin-4-bottom'>
				<Row align='middle'>
					<Col span={24}>
						<Typography.Title noMargin level={4} type='primary'>
							{t('Your profile')}
						</Typography.Title>
					</Col>
				</Row>
			</Col>

			<Col span={24}>
				<Card>
					<Row>
						<Col md={{ span: 12, offset: 6 }}>
							<Tabs activeKey={activeTab} onChange={setActiveTab}>
								<Tabs.TabPane tab={t('General')} key='general'>
									<General />
								</Tabs.TabPane>
								<Tabs.TabPane tab={t('Password')} key='password'>
									<UpdatePassword />
								</Tabs.TabPane>
							</Tabs>
						</Col>
					</Row>
				</Card>
			</Col>
		</Row>
	);
};
