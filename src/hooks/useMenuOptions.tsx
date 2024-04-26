import { useTranslation } from 'react-i18next';

const useMenuOptions = () => {
	const { t } = useTranslation();

	const menuOptions = [
		{ key: 'active', label: t('Active') },
		{ key: 'inactive', label: t('Inactive'), queryKey: 'status' },
		{ key: 'all', label: t('All'), queryKey: 'status' },
	];

	return { menuOptions };
};

export default useMenuOptions;
