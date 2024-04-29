interface DynamicType {
	[x: string]: string;
}

interface UpdateStausRequest {
	endpoint: string;
	id: number;
	recordType: string;
	payload: {
		[key: string]: boolean;
	};
}

interface UpdateStatusResponse extends DynamicType {
	id: number;
}

interface Pagination<T> {
	count: number;
	next?: string;
	previous?: string;
	results: T;
}

interface PaginateParams {
	page?: number;
	limit?: number;
	is_active?: boolean | string | undefined;
	is_available?: boolean | string | undefined;
	category?: string;
}

interface DEFAULT_LIST_PARAMS extends PaginateParams {
	is_active?: boolean;
}

interface DefaultResponse {
	detail: string;
}

type Mode = 'create' | 'update';