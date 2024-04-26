export type RequestOptions = {
	headers?: Record<string, string>;
};

export type RequestBody = string | FormData | null;

export type HttpServiceConfig = {
	getToken?: () => string | null;
	getRefreshToken?: () => string | null;
	onUpdateToken?: (token: string) => void;
	onUnauthorised?: () => void;
	onLoading?: (status: 'start' | 'error' | 'complete') => void;
};

export type RefreshTokenResponse = {
	access_token: string;
};
