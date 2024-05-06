interface AuthState {
	user: ProfileResponse | null;
	permissions: string[];
}

interface AuthActions {
	setUser: (payload: AuthState['user']) => void;
	setPermissions: (payload: string[]) => void;
	clear: () => void;
}

interface AuthStore extends AuthState, AuthActions {}
