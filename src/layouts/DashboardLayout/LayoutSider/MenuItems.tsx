import type { MenuProps } from 'antd';
import { useCallback } from 'react';
import { useAccessContext } from 'react-access-boundary';
import { useTranslation } from 'react-i18next';

import { ReactComponent as DashboarIcon } from '~/assets/images/sidebar/bar-chart.svg';
import { translationKeys } from '~/config/translate/i18next';
import { PRIVATE_ROUTES } from '~/routes/paths';

type ITEM_GROUP = {
	type: 'group';
	label: translationKeys;
	permission?: string | string[];
};

type ITEM = {
	icon: JSX.Element;
	key: string;
	label: translationKeys;
	permission?: string | string[];
	children?: Omit<ITEM, 'icon' | 'children'>[];
};

const { DASHBOARD } = PRIVATE_ROUTES;

const ITEMS: (ITEM | ITEM_GROUP)[] = [
	{
		type: 'group',
		label: 'General',
	},
	{
		icon: <DashboarIcon />,
		key: DASHBOARD,
		label: 'Dashboard',
	},
];

export const MenuItems = () => {
	const { t } = useTranslation();
	const { isAllowedTo } = useAccessContext();
	const isAllowedPermission = useCallback(
		(permission: string | string[]) => {
			if (Array.isArray(permission)) {
				for (const item of permission) {
					return isAllowedTo(item);
				}

				return false;
			}

			return isAllowedTo(permission);
		},
		[isAllowedTo]
	);

	const transform = (items: typeof ITEMS) =>
		items
			?.map((item) =>
				!item?.permission || isAllowedPermission(item?.permission)
					? {
							...item,
							label: t(item?.label),
							...('children' in item
								? {
										children: item?.children
											? item.children
													?.map((child) =>
														!child.permission || isAllowedPermission(child?.permission)
															? { ...child, label: t(child.label) }
															: undefined
													)
													?.filter((item) => item !== undefined)
											: undefined,
								  }
								: {}),
					  }
					: undefined
			)
			?.filter((item) => item !== undefined) as MenuProps['items'];

	return transform(ITEMS);
};
