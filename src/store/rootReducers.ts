import { combineReducers } from 'redux';

import appSlice from './appSlice';

export default combineReducers({
	app: appSlice.reducer,
});
