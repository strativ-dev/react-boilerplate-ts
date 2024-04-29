import config from '~/config';
import { store } from '~/store';
import { appActions } from '~/store/actions';
import { HttpService } from './httpService';

class AuthAPI {
	constructor(private http: HttpService) {}

	login(payload: LoginPayload) {
		return this.http.post<LoginResponse>('token/login/', payload);
	}

	forgotPassword(email: string) {
		return this.http.post<{ detail: string }>('users/reset_password/', { email });
	}

	resetPassword(payload: ResetPasswordPayload) {
		return this.http.post<{ detail: string }>('users/reset_password_confirm/', payload);
	}

	configuration() {
		return this.http.get<LoginConfig>('loginpage-configuration/');
	}
}

const onLoading = (type: 'start' | 'error' | 'complete') => {
	store.dispatch(appActions.updateRoute(type));
};
const httpService = new HttpService(config.apiURL, { onLoading });
export const authAPI = new AuthAPI(httpService);
