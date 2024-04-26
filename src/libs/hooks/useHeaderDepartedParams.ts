import { useMemo } from 'react';

export const useDepartedParam = (
	searchParams: any,
	current: number,
	pageSize: number,
	name: string
) => {
	const params = useMemo(() => {
		const departedStatus = searchParams.get('is_departed') || 'inactive';
		return {
			page: current,
			limit: pageSize,
			name,
			is_departed:
				departedStatus === 'active'
					? ('true' as unknown as boolean)
					: departedStatus === 'inactive'
					? ('false' as unknown as boolean)
					: undefined,
		};
	}, [current, pageSize, searchParams, name]);

	return params;
};
