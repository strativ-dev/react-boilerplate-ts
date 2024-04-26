import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

const BackButton: React.FC = () => {
	const { t } = useTranslation();
	const handleGoBack = () => {
		window.history.back();
	};

	return (
		<Button
			style={{ padding: 0, fontWeight: 'bold' }}
			type='link'
			onClick={handleGoBack}
			icon={<ArrowLeftOutlined />}
		>
			{t('Back')}
		</Button>
	);
};

export default BackButton;
