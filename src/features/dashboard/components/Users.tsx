import { Empty } from 'antd';
import { useAccessContext } from 'react-access-boundary';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { DataTable } from '@/components/Atoms';
import useMenuOptions from '@/hooks/useMenuOptions';
import usePageParams from '@/hooks/usePageParams';
import { usersAPI } from '@/libs/api';
import usersUtils from '../usersUtils';

const { Header, HeaderTop, Title, Link: DataTableLink, MenuOptions, Body } = DataTable;

const Users: React.FC = () => {
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
							type: 'date-range',
							searchKey: 'departure_dates',
							searchLabel: t('Departure date range'),
							param: ['from_departure_date', 'to_departure_date'],
							placeholder: [t('Departure from'), t('Departure to')],
						},
						{
							type: 'select',
							searchKey: 'select',
							searchLabel: t('Select'),
							placeholder: t('Select'),
							options: [
								{
									value: '1',
									label: 'One',
								},
								{
									value: '2',
									label: 'Two',
								},
							],
						},
						{
							type: 'multipleSelect',
							searchKey: 'multi-select',
							searchLabel: t('Multi select'),
							options: [
								{
									value: '1',
									label: 'One',
								},
								{
									value: '2',
									label: 'Two',
								},
							],
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

export default Users;
