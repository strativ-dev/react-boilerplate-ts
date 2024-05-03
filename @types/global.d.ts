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

type RequestOptions = {
	headers?: Record<string, string>;
};

type RequestBody = string | FormData | null;

type HttpServiceConfig = {
	getToken?: () => string | null;
	getRefreshToken?: () => string | null;
	onUpdateToken?: (token: string) => void;
	onUnauthorised?: () => void;
	onLoading?: (status: 'start' | 'error' | 'complete') => void;
};

type RefreshTokenResponse = {
	access_token: string;
};

type Mode = 'create' | 'update';

type ParsedUrlQuery = {
	[key: string]: string | string[] | undefined;
};

type InitMonthType = Intl.DateTimeFormatOptions['month'];

type SearchObject = {
	[key: string]: string | number | undefined;
};
