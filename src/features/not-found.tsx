import { Button, Result } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { routeNavigate } from '@/routes/utils';

const NotFound: FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<Result
			status='404'
			title='404'
			subTitle='Sorry, the page you visited does not exist.'
			extra={
				<Button type='primary' onClick={() => navigate(routeNavigate('DASHBOARD'))}>
					{t('Back Home')}
				</Button>
			}
		/>
	);
};

export default NotFound;
