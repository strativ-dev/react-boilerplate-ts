export interface LoginPayload {
	email: string;
	password: string;
}

export interface LoginResponse {
	auth_token: string;
}

export interface ResetPasswordPayload {
	uid: string;
	token: string;
	new_password: string;
	re_new_password: string;
}

export interface LoginConfig {
	logo?: string;
	favicon?: string;
	login_page_bg_image?: string;
	color_code?: string;
	company_name?: string;
}
