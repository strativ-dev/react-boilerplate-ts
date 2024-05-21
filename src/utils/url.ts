import config from '@/config';

/**
 * You can use this function to add or update URL
 * query parameters. It will merge them with existing
 * parameters and return new `URLSearchParams` object.
 */
export const updateURLSearchParams = (
	query: ParsedUrlQuery,
	newQuery: ParsedUrlQuery = {}
): URLSearchParams => {
	const params = new URLSearchParams();

	const updateParams = (key: string, value: ParsedUrlQuery['key']) => {
		if (Array.isArray(value)) {
			value.map((e) => params.append(key, e));
		} else if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}
	};

	for (const [key, value] of Object.entries(query)) {
		updateParams(key, value);
	}

	for (const [key, value] of Object.entries(newQuery)) {
		updateParams(key, value);
	}

	return params;
};

export const getPaginatedParams = (searchParams: URLSearchParams, page: number, size: number) => {
	const params = new URLSearchParams(searchParams);

	if (page === 1) {
		params.delete('page');
	} else {
		params.set('page', page.toString());
	}

	if (size === config.itemsPerPage) {
		params.delete('limit');
	} else {
		params.set('limit', size.toString());
	}

	return params;
};

export const getPaginatedSearchParams = (
	searchParams: URLSearchParams,
	searchData: SearchObject
) => {
	const params = new URLSearchParams(searchParams);
	//map from keys of search object to set url params

	Object.keys(searchData).map((key) => {
		if (searchData[key]) {
			params.set(key.toString(), (searchData[key] as string | number).toString());
		} else {
			params.delete(key);
		}
	});
	return params;
};
