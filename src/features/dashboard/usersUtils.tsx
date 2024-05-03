import { ColumnsType } from 'antd/lib/table';
import { useAccessContext } from 'react-access-boundary';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { StatusColumn } from '~/components/StatusColumn';

const usersUtils = () => {
	const { t } = useTranslation();
	const { isAllowedTo } = useAccessContext();
	const queryClient = useQueryClient();

	const columns: ColumnsType<User> = [
		{
			title: t('Name'),
			dataIndex: 'first_name',
			width: 250,
			ellipsis: true,
			render: (_, record) => {
				const fullName = `${record.first_name} ${record.last_name}`;

				return isAllowedTo('CHANGE_USER') ? (
					<Link to={`edit/${record.id}`}>{fullName}</Link>
				) : (
					fullName
				);
			},
		},
		{ title: t('Email'), width: 200, ellipsis: true, dataIndex: 'email' },
		{
			width: 160,
			align: 'center',
			title: t('Status'),
			dataIndex: 'is_active',
			key: 'is_active',
			render: (is_active, { id }) => (
				<StatusColumn
					status={is_active}
					id={id}
					endpoint='users'
					isDisabled={!isAllowedTo('CHANGE_USER')}
					onSuccessFn={() => {
						queryClient.invalidateQueries('settings-users');
					}}
				/>
			),
		},
	];

	return {
		columns,
	};
};

export default usersUtils;
