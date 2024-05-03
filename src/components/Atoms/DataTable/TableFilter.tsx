import { CheckOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Input, Row, Select, Switch, Typography } from 'antd';
import { FilterDropdownProps } from 'antd/es/table/interface';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createGlobalStyle, useTheme } from 'styled-components';

import { ReactComponent as FilterIcon } from '~/assets/images/icons/funnelIcon.svg';
import { selectFilterBy } from '~/utils';

interface TableFilterProps {
	width?: number;
	placeholder?: string;
}

interface FieldOption {
	id?: string | number;
	value: string | number;
	label: string;
}

interface SelectFilter extends TableFilterProps {
	searchKey: string;
	filterType: 'select';
	isLoading?: boolean;
	options: FieldOption[];
}

interface SearchFilter extends TableFilterProps {
	searchKey: string;
	filterType: 'search';
}

interface DateRangeFilter extends TableFilterProps {
	filterType: 'dateRange';
	searchKey: [string, string];
}

interface SwitchFilter extends TableFilterProps {
	filterType: 'switch';
	searchKey: string;
	label?: string;
}

const FloatingFix = createGlobalStyle`
  .ant-dropdown {
    z-index: 99 !important;
  }
`;

export const generateColumnFilter = (orderBy: string, sortOrder: string | null) => {
	return {
		sorter: true,
		sortOrder: !sortOrder
			? null
			: sortOrder.includes(orderBy)
			? sortOrder.includes('-')
				? 'descend'
				: 'ascend'
			: null,
	} as ColumnType<any>;
};

export const generateFilter = (
	params: SelectFilter | SearchFilter | DateRangeFilter | SwitchFilter
) => {
	const [searchParams] = useSearchParams();
	const theme = useTheme();
	const hasFilter = useMemo(
		() =>
			params.filterType !== 'dateRange'
				? !!searchParams.get(params?.searchKey)
				: !!searchParams.get(params?.searchKey[0]) || !!searchParams.get(params?.searchKey[1]),
		[params?.searchKey, searchParams, params.filterType]
	);

	return {
		filterDropdown: (filterDropDownParams) => TableFilter({ ...params, ...filterDropDownParams }),
		filterIcon: () => (
			<FilterIcon
				style={{
					color: hasFilter ? theme.colorPrimary : undefined,
				}}
			/>
		),
	} as ColumnType<any>;
};

const TableFilter: FC<
	(SelectFilter | SearchFilter | DateRangeFilter | SwitchFilter) & FilterDropdownProps
> = (props) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { filterType, searchKey, confirm, placeholder, width = 200 } = props;
	const options = filterType === 'select' ? props.options : [];
	const [filterValue, setFilterValue] = useState<
		string | null | [string | null | undefined, string | null | undefined]
	>(
		filterType !== 'dateRange'
			? searchParams.get(searchKey)
			: [
					searchParams.get(searchKey?.[0]) || undefined,
					searchParams.get(searchKey?.[1]) || undefined,
			  ]
	);

	const handleApplyFilter = () => {
		if (filterType === 'dateRange') {
			if (filterValue && filterValue[0]) searchParams.set(searchKey[0], filterValue[0]);
			else searchParams.delete(searchKey[0]);
			if (filterValue && filterValue[1]) searchParams.set(searchKey[1], filterValue[1]);
			else searchParams.delete(searchKey[1]);
		} else {
			if (filterValue && !Array.isArray(filterValue)) searchParams.set(searchKey, filterValue);
			else searchParams.delete(searchKey);
		}
		searchParams.delete('page');
		navigate({
			search: searchParams.toString(),
		});
		confirm({ closeDropdown: true });
	};

	const handleRemoveFilter = () => {
		setFilterValue(filterType === 'dateRange' ? [undefined, undefined] : null);
		if (filterType === 'dateRange') {
			searchParams.delete(searchKey[0]);
			searchParams.delete(searchKey[1]);
		} else searchParams.delete(searchKey);
		searchParams.delete('page');
		navigate({
			search: searchParams.toString(),
		});
		confirm({ closeDropdown: true });
	};

	return (
		<Card bodyStyle={{ padding: '0.5rem', width: `${width}px` }}>
			<Row gutter={[4, 4]}>
				<Col span={24}>
					{filterType === 'search' && (
						<Input
							value={filterValue as string}
							onChange={(e) => setFilterValue(e.target.value)}
							placeholder={placeholder || t('Search')}
						/>
					)}
					{filterType === 'select' && (
						<>
							<FloatingFix />
							<Select
								style={{
									width: '100%',
								}}
								loading={props?.isLoading}
								options={options}
								value={filterValue || undefined}
								allowClear
								showSearch
								placeholder={placeholder || t('Select')}
								onChange={setFilterValue}
								filterOption={selectFilterBy}
							/>
						</>
					)}
					{filterType === 'dateRange' && (
						<>
							<FloatingFix />
							<DatePicker.RangePicker
								value={[
									filterValue?.[0] ? dayjs(filterValue[0]) : null,
									filterValue?.[1] ? dayjs(filterValue?.[1]) : null,
								]}
								onChange={(value) =>
									setFilterValue([
										value?.[0]?.format('YYYY-MM-DD') || undefined,
										value?.[1]?.format('YYYY-MM-DD') || undefined,
									])
								}
							/>
						</>
					)}
					{filterType === 'switch' && (
						<Row justify='space-between' style={{ margin: '0.25rem 0.25rem 0.5rem 0.25rem' }}>
							<Col>
								<Typography.Text>{props.label}</Typography.Text>
							</Col>
							<Col>
								<Switch
									checked={filterValue === '1'}
									onChange={(checked) => setFilterValue(checked ? '1' : null)}
								/>
							</Col>
						</Row>
					)}
				</Col>
				<Col span={12}>
					<Button
						size='small'
						style={{ width: '100%' }}
						onClick={handleApplyFilter}
						icon={<CheckOutlined />}
						type='primary'
					/>
				</Col>
				<Col span={12}>
					<Button
						size='small'
						style={{ width: '100%' }}
						onClick={handleRemoveFilter}
						icon={<ReloadOutlined />}
					/>
				</Col>
			</Row>
		</Card>
	);
};

export default TableFilter;
