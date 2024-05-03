import { Card, Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Tabs } from '~/components/Atoms';
import SectionHeader from '~/components/SectionHeader';
import profileUtls from './utils';

const Profile = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const activeKey = searchParams.get('type') || 'general';
	const { t } = useTranslation();
	const { items } = profileUtls();

	const handleTabChange = (key: string) => {
		navigate(`?type=${key}`);
	};

	return (
		<>
			<SectionHeader between marginBottom>
				<SectionHeader.Title>{t('Your profile')}</SectionHeader.Title>
				<SectionHeader.Cancel />
			</SectionHeader>

			<Card>
				<Row justify='center'>
					<Col md={12}>
						<Tabs
							fullWidth={false}
							activeKey={activeKey}
							items={items}
							onChange={handleTabChange}
						/>
					</Col>
				</Row>
			</Card>
		</>
	);
};

export default Profile;
