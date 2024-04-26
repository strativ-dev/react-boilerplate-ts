import { useMemo } from 'react';

export const useDropdownParam = (searchParams: any, current: number, pageSize: number) => {
	const params = useMemo(() => {
		const status = searchParams.get('status') || 'active';

		return {
			page: current,
			limit: pageSize,
			is_active:
				status === 'active'
					? ('true' as unknown as boolean)
					: status === 'inactive'
					? ('false' as unknown as boolean)
					: undefined,
		};
	}, [current, pageSize, searchParams]);

	return params;
};
