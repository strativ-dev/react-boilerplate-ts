import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import config from '@/config';
import { getPaginatedParams } from '@/utils/helpers';

interface PageParams {
	[key: string]: string;
}

const usePageParams = (keys?: string[]) => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const activeItem = searchParams.get('status') || 'active';
	const searchParamsKeys = keys ? keys.filter((key) => searchParams.has(key)) : [];

	const handlePageChange = useCallback(
		(page: number, size: number) => {
			const params = getPaginatedParams(searchParams, page, size);
			navigate({ search: params.toString() });
		},
		[navigate, searchParams]
	);

	const defaultParams = {
		current: parseInt(searchParams.get('page') || '1'),
		pageSize: parseInt(searchParams.get('limit') || `${config.itemsPerPage}`),
		activeItem,
		name: searchParams.get('name') || '',
		email: searchParams.get('email') || '',
		search: searchParams.get('search') || '',
		status: searchParams.get('status') || '',
		phone: searchParams.get('phone') || '',
		to_email: searchParams.get('to_email') || '',
		handlePageChange,
		is_active:
			activeItem === 'active'
				? ('true' as string)
				: activeItem === 'inactive'
				? ('false' as unknown as string)
				: '',
	};

	if (searchParamsKeys.length) {
		const dynamicParams: PageParams = searchParamsKeys.reduce((acc, key) => {
			acc[key] = searchParams.get(key) || '';

			return acc;
		}, {} as PageParams);

		return {
			...defaultParams,
			...dynamicParams,
		} as typeof defaultParams & PageParams;
	}

	return {
		...defaultParams,
	} as typeof defaultParams & PageParams;
};

export default usePageParams;
