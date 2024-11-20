import { HomeOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { useAccessContext } from 'react-access-boundary-v2';
import { useTranslation } from 'react-i18next';

import { PRIVATE_ROUTES } from '@/routes/paths';

const { DASHBOARD } = PRIVATE_ROUTES;

type ITEM_GROUP = {
  type: 'group';
  label: string;
  permission?: string | string[];
  children?: ITEM[];
};

type ITEM = {
  icon?: JSX.Element;
  key: string;
  label: string;
  permission?: string | string[];
  children?: ITEM[];
};

const MenuItems = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'sidebar',
  });
  const { isAllowedTo } = useAccessContext();

  const ITEMS: (ITEM | ITEM_GROUP)[] = [
    {
      key: DASHBOARD,
      icon: <HomeOutlined />,
      label: t('dashboard'),
    },
  ];

  const transform = (items: typeof ITEMS) => {
    return items
      .map((item) => {
        if (!item?.permission || isAllowedTo(item?.permission)) {
          const transformedItem: ITEM | ITEM_GROUP = item;
          if ('children' in item && item.children) {
            transformedItem.children = transform(item.children) as ITEM[];
          }
          return transformedItem;
        }
      })
      .filter(Boolean) as MenuProps['items'];
  };

  return transform(ITEMS);
};

export default MenuItems;
