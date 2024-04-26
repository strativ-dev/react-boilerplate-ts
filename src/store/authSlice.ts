import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
	user: ProfileResponse | null;
	permissions: string[];
};

const initialState: AuthState = {
	user: null,
	permissions: [],
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<AuthState['user']>) => {
			state.user = action.payload;
		},
		setPermissions: (state, action: PayloadAction<string[]>) => {
			state.permissions = action.payload;
		},
		clear: () => initialState,
	},
});

export default authSlice;
