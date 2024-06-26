import { TabsProps } from 'antd';
import { useTranslation } from 'react-i18next';

import General from '../general';
import UpdatePassword from '../update-password';

const profileUtls = () => {
	const { t } = useTranslation();

	const items: TabsProps['items'] = [
		{
			key: 'general',
			label: t('General'),
			children: <General />,
		},
		{
			key: 'password',
			label: t('Password'),
			children: <UpdatePassword />,
		},
	];

	return {
		items,
	};
};

export default profileUtls;
