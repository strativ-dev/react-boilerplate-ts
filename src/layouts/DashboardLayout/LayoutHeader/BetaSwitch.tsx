import { Space, Typography } from 'antd';
import { useMemo } from 'react';

import { Switch } from '~/components/Atoms';
import { useStoreDispatch, useStoreSelector } from '~/store';
import { appActions } from '~/store/actions';

export const BetaSwitch = () => {
	const { user } = useStoreSelector((state) => state.auth);
	const { isBetaMode } = useStoreSelector((state) => state.app);
	const dispatch = useStoreDispatch();

	const isStrativUser = useMemo(() => {
		const isStarativUser = user?.email?.includes('@strativ.se');
		if (!isStarativUser && isBetaMode) {
			dispatch(appActions.updateBetaMode(false));
		}
		return isStarativUser;
	}, [user?.email, isBetaMode, dispatch]);

	if (!isStrativUser) return null;

	return (
		<Space>
			<Typography.Text type='secondary'>Beta features</Typography.Text>
			<Switch
				checkedChildren='On'
				unCheckedChildren='Off'
				checked={isBetaMode}
				onChange={(checked) => dispatch(appActions.updateBetaMode(checked))}
			/>
		</Space>
	);
};
