import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import config from '~/config';
import { getPaginatedParams } from '~/utils';

type PageParams = {
	limit?: string;
	activeKey?: string;
	params?: string[];
};

type StaticParams = {
	current: number;
	pageSize: number;
	activeItem: string;
	name: string;
	email: string;
	search: string;
	status: string;
	phone: string;
	is_active: string;
	handlePageChange: (page: number, size: number) => void;
};

type DynamicParams = Record<string, string>;

type PageParamsResult = StaticParams & DynamicParams;

const usePageParams = ({
	params,
	limit = `${config.itemsPerPage}`,
	activeKey = 'active',
}: PageParams = {}) => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const activeItem = searchParams.get('status') || activeKey;

	const handlePageChange = useCallback(
		(page: number, size: number) => {
			const params = getPaginatedParams(searchParams, page, size);
			navigate({ search: params.toString() });
		},
		[navigate, searchParams]
	);

	const defaultParams: StaticParams = {
		current: parseInt(searchParams.get('page') || '1'),
		pageSize: parseInt(searchParams.get('limit') || limit),
		activeItem,
		name: searchParams.get('name') || '',
		email: searchParams.get('email') || '',
		search: searchParams.get('search') || '',
		status: searchParams.get('status') || '',
		phone: searchParams.get('phone') || '',
		is_active: activeItem === 'active' ? 'true' : activeItem === 'inactive' ? 'false' : '',
		handlePageChange,
	};

	if (params && params.length) {
		const dynamicParams: DynamicParams = {};

		params.forEach((key) => {
			if (searchParams.has(key)) {
				dynamicParams[key] = searchParams.get(key) || '';
			}
		});

		return {
			...defaultParams,
			...dynamicParams,
		} as PageParamsResult;
	}

	return defaultParams as PageParamsResult;
};

export default usePageParams;
