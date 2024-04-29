import { CloseCircleFilled, ReloadOutlined } from '@ant-design/icons';
import {
	Col,
	DatePicker,
	Input,
	Radio,
	RadioChangeEvent,
	RadioProps,
	Row,
	Select,
	Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../Button';

type Filter =
	| {
			type: 'search';
			searchKey: string;
			searchLabel?: string;
			placeholder?: string;
	  }
	| {
			type: 'select' | 'multipleSelect';
			searchKey: string;
			searchLabel?: string;
			options: { value: string | number; label: string }[];
			placeholder?: string;
	  }
	| {
			type: 'date-range';
			searchKey: string;
			searchLabel?: string;
			param: string[];
			placeholder: string[];
			value?: [dayjs.Dayjs, dayjs.Dayjs];
	  };
interface TableMenuOptionsProps {
	options?: { key: string; label: string; queryKey?: string }[];
	activeItem?: string;
	isReset?: boolean;
	removeKey?: string;
	filter?: Filter | Filter[];
}

const TableMenuOptionRow = styled(Row)`
	padding: 1rem 1rem 0 1rem;
	margin: 1rem -1rem 0 -1rem;
	border-top: 1px solid ${(props) => props.theme.colorBorderSecondary};
`;

const TableMenuOptions = ({
	options,
	activeItem,
	filter,
	isReset = false,
	removeKey = 'active',
}: TableMenuOptionsProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [selectedSearchKey, setSelectedSearchKey] = useState(
		Array.isArray(filter)
			? filter.find((item) => searchParams.has(item.searchKey))?.searchKey ?? filter?.[0]?.searchKey
			: filter?.searchKey
	);
	const selectedFilter = useMemo(
		() =>
			Array.isArray(filter) ? filter?.find((item) => item.searchKey === selectedSearchKey) : filter,
		[filter, selectedSearchKey]
	);
	const getSelectedSearchKeyValue = useMemo(() => {
		if (!selectedSearchKey) return '';
		if (selectedFilter?.type === 'multipleSelect')
			return searchParams.get(selectedSearchKey)?.split(',');
		if (selectedSearchKey === 'date-range')
			return [
				searchParams.get(selectedSearchKey?.[0]) || undefined,
				searchParams.get(selectedSearchKey?.[1]) || undefined,
			];
		return searchParams.get(selectedSearchKey);
	}, [searchParams, selectedFilter?.type, selectedSearchKey]);

	const [filterValue, setFilterValue] = useState(getSelectedSearchKeyValue);

	const filterOptions = Array.isArray(filter)
		? filter?.map((item) => ({
				value: item.searchKey,
				label: item.searchLabel ?? item.searchKey,
				type: item.type,
		  }))
		: [];

	const handleClick = useCallback(
		(key: RadioProps) => {
			const params = new URLSearchParams(searchParams);
			const activeOption = options?.find((item) => item.key === key);
			if (activeOption?.queryKey) params.set(activeOption.queryKey, activeOption.key);
			if (activeOption?.key === removeKey) params.delete('status');
			params.delete('page');

			navigate({ search: params.toString() });
		},
		[navigate, options, searchParams, removeKey]
	);

	const handleChange = (e: RadioChangeEvent) => {
		handleClick(e.target.value);
	};

	const handleSearch = (value: any, id?: any) => {
		if (!selectedSearchKey) return;

		if (value || filterValue) {
			if (selectedFilter?.type === 'date-range') {
				const dateValue1 = (value && value[0]) || (filterValue && filterValue[0]);
				const dateValue2 = (value && value[1]) || (filterValue && filterValue[1]);

				if (dateValue1) {
					searchParams.set(selectedFilter.param[0], dateValue1);
				} else searchParams.delete(selectedFilter.param[0]);
				if (dateValue2) searchParams.set(selectedFilter.param[1], dateValue2);
				else searchParams.delete(selectedFilter.param[1]);
			} else {
				if (selectedFilter?.searchKey === 'email_event') {
					searchParams.set('email_id', id);
				}
				searchParams.set(selectedSearchKey, value || filterValue);
				searchParams.delete('page');
			}
		} else searchParams.delete(selectedSearchKey);

		navigate({ search: searchParams.toString() });
	};

	const handleClearSearch = (e?: any) => {
		if (!selectedSearchKey) return;
		e?.stopPropagation();

		setFilterValue('');

		if (selectedFilter?.type === 'date-range') {
			setFilterValue(selectedFilter?.type === 'date-range' ? [undefined, undefined] : '');
			searchParams.delete(selectedFilter.param[0]);
			searchParams.delete(selectedFilter.param[1]);
		} else searchParams.delete(selectedSearchKey);

		searchParams.delete('page');

		navigate({ search: searchParams.toString() });
	};

	const handleResetFilter = (e: any) => {
		e?.stopPropagation();
		if (!selectedSearchKey) return;

		setFilterValue('');

		if (selectedFilter?.type === 'date-range') {
			setFilterValue(selectedFilter?.type === 'date-range' ? [undefined, undefined] : '');
		}

		navigate({ search: '' });
	};

	return (
		<TableMenuOptionRow align='middle' justify='space-between'>
			<Col span={12}>
				{options?.length ? (
					<Radio.Group
						value={activeItem}
						onChange={handleChange}
						buttonStyle='solid'
						style={{
							boxShadow: '0px 1px 2px 0px #1018280D',
						}}
					>
						{options.map((menu, index) => (
							<Radio.Button key={index} value={menu.key}>
								{menu.label}
							</Radio.Button>
						))}
					</Radio.Group>
				) : null}
			</Col>
			{filter && (
				<Col span={12}>
					<Row justify='end' gutter={[8, 8]}>
						{filterOptions?.length ? (
							<Col span={8}>
								<SearchOptionSelect
									style={{ width: '100%' }}
									options={filterOptions}
									value={selectedSearchKey}
									onChange={(value: any, option: any) => {
										const modifiedFilterValue =
											option?.type === 'multipleSelect'
												? searchParams.get(value)?.split(',')
												: searchParams.get(value);
										setSelectedSearchKey(value);
										setFilterValue(modifiedFilterValue);
									}}
								/>
							</Col>
						) : null}
						<Col span={11}>
							{selectedFilter?.type === 'search' && (
								<Input.Search
									placeholder={selectedFilter.placeholder || t('Search')}
									value={(filterValue as string) ?? ''}
									allowClear={{
										clearIcon: <CloseCircleFilled onClick={handleClearSearch} />,
									}}
									onChange={(e) => setFilterValue(e.target.value)}
									onSearch={handleSearch}
								/>
							)}
							{selectedFilter?.type === 'select' && (
								<Select
									style={{ width: '100%' }}
									placeholder={selectedFilter.placeholder || t('Select')}
									options={selectedFilter.options}
									value={filterValue}
									onChange={(value, record) => {
										if (!value) {
											handleClearSearch();
										} else {
											if (selectedFilter?.searchKey === 'email_event') {
												const label = Array.isArray(record) ? record[0]?.label : record?.label;
												handleSearch(label, value);
											} else {
												handleSearch(value);
											}
										}
										setFilterValue(value);
									}}
									allowClear
								/>
							)}
							{selectedFilter?.type === 'date-range' && (
								<DatePicker.RangePicker
									placeholder={
										selectedFilter.placeholder
											? [selectedFilter.placeholder[0] as string, selectedFilter.placeholder[1]]
											: undefined
									}
									value={[
										filterValue?.[0] ? dayjs(filterValue[0]) : null,
										filterValue?.[1] ? dayjs(filterValue?.[1]) : null,
									]}
									onChange={(value) => {
										if (!value) {
											handleClearSearch();
										} else {
											handleSearch([
												value?.[0]?.format('YYYY-MM-DD') || undefined,
												value?.[1]?.format('YYYY-MM-DD') || undefined,
											]);
										}
										setFilterValue([
											value?.[0]?.format('YYYY-MM-DD') || undefined,
											value?.[1]?.format('YYYY-MM-DD') || undefined,
										]);
									}}
								/>
							)}
							{selectedFilter?.type === 'multipleSelect' && (
								<Select
									style={{ width: '100%' }}
									mode='multiple'
									placeholder={selectedFilter.placeholder || t('Select')}
									options={selectedFilter.options}
									value={filterValue || []}
									onChange={(value) => {
										if (!value.length) {
											handleClearSearch();
										} else {
											handleSearch(value);
										}
										setFilterValue(value);
									}}
									allowClear
								/>
							)}
						</Col>
						{isReset && (
							<Col>
								<Tooltip title={t('Reset')} placement='bottom'>
									<Button type='default' onClick={handleResetFilter}>
										<ReloadOutlined />
									</Button>
								</Tooltip>
							</Col>
						)}
					</Row>
				</Col>
			)}
		</TableMenuOptionRow>
	);
};

const SearchOptionSelect = styled(Select)`
	.ant-select-selection-item {
		font-weight: 500;
	}
`;

export default TableMenuOptions;
