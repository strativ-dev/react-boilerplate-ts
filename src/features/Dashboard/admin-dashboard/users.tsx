import { Empty } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAccessContext } from 'react-access-boundary';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import DataTable from '~/components/Atoms/DataTable';
import useMenuOptions from '~/hooks/useMenuOptions';
import usePageParams from '~/hooks/usePageParams';
import { usersAPI } from '~/libs/api';
import usersUtils from './usersUtils';
dayjs.extend(relativeTime);

const { Header, HeaderTop, Title, Link: DataTableLink, MenuOptions, Body } = DataTable;

export const Users: React.FC = () => {
	const { t } = useTranslation();
	const { isAllowedTo } = useAccessContext();
	const { menuOptions } = useMenuOptions();
	const { current, pageSize, is_active, name, email, activeItem, handlePageChange } =
		usePageParams();
	const { columns } = usersUtils();

	const userParams = {
		page: current,
		limit: pageSize,
		email,
		name,
		is_active,
	};

	const { data, isLoading, isFetching } = useQuery(['settings-users', userParams], () =>
		usersAPI.users(userParams)
	);

	return (
		<DataTable>
			<Header>
				<HeaderTop>
					<Title>{`${t(`Users`)} (${data?.total || 0})`}</Title>
					{isAllowedTo('ADD_USER') && <DataTableLink path='create'>{t('Create')}</DataTableLink>}
				</HeaderTop>
				<MenuOptions
					isReset
					options={menuOptions}
					activeItem={activeItem}
					filter={[
						{
							type: 'search',
							searchKey: 'email',
							searchLabel: t('Search by email'),
						},
						{
							type: 'search',
							searchKey: 'name',
							searchLabel: t('Search by name'),
						},
					]}
				/>
			</Header>
			<Body
				count={data?.total}
				locale={{
					emptyText: (
						<Empty
							image={Empty.PRESENTED_IMAGE_SIMPLE}
							description={<span>{t('No results found')}</span>}
						/>
					),
				}}
				dataSource={data ? data.data : []}
				columns={columns}
				rowKey='id'
				scroll={{ y: '100%' }}
				loading={isLoading || isFetching}
				pagination={{
					locale: { items_per_page: `/\t${t('page')}` },
					pageSize,
					current,
					total: data?.total,
					onChange: handlePageChange,
					showSizeChanger: true,
				}}
			/>
		</DataTable>
	);
};
