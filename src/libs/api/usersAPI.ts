/* eslint-disable @typescript-eslint/ban-types */
import config from '~/config';
import { authService } from '../auth';
import { Common } from './common';
import { HttpAuthService } from './httpService';

class UsersAPI extends Common {
	constructor(private http: HttpAuthService) {
		super(config.itemsPerPage);
	}

	profile() {
		return this.http.get<ProfileResponse>('users/me/');
	}

	updatePassword(current_password: string, new_password: string) {
		const payload = { current_password, new_password, re_new_password: new_password };
		return this.http.post<{}>('users/set_password/', payload);
	}

	users(params: UsersPragmas) {
		const paginateURL = this.setURL('users/').params(params).getURL();
		return this.http.get<UsersResponse>(paginateURL);
	}

	user(ID: number) {
		return this.http.get<User>(`users/${ID}/`);
	}

	updateUser(ID: number, payload: Partial<UserUpdatePayload>) {
		return this.http.put<User>(`users/${ID}/`, payload);
	}

	createUser(payload: UserCreatePayload) {
		return this.http.post<User>('users/', payload);
	}

	logout() {
		return this.http.post<ProfileResponse['permissions']>('token/logout/', {});
	}
}

const httpAuthService = new HttpAuthService(config.apiURL, authService);
export const usersAPI = new UsersAPI(httpAuthService);
