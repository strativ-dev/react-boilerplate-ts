import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
	routeChange: 'start' | 'complete' | 'error';
};

const initialState: AppState = {
	routeChange: 'complete',
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		updateRoute: (state, action: PayloadAction<AppState['routeChange']>) => {
			state.routeChange = action.payload;
		},
	},
});

export default appSlice;
