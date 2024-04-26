import { routeNavigate } from '@/routes/utils';
import { Button, Result } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const NotAuthorized: FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<Result
			status='403'
			title='403'
			subTitle={t('Sorry, you are not authorized to access this page.')}
			extra={
				<Button type='primary' onClick={() => navigate(routeNavigate('DASHBOARD'))}>
					{t('Back Home')}
				</Button>
			}
		/>
	);
};

export default NotAuthorized;
