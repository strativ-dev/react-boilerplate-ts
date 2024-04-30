export const PUBLIC_ROUTES = {
	SIGNIN: '/',
	FORGOT_PASSWORD: 'forgot-password',
	RESET_PASSWORD: 'password-reset/:id/:token',
};

export const PRIVATE_ROUTES = {
	PARAM_ID: ':id',
	CREATE: 'create',
	EDIT: 'edit',
	DASHBOARD: '',
	PROFILE: 'profile',
};
