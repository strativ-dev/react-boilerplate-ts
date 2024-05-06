import { Space, Typography } from 'antd';
import { useMemo } from 'react';

import { Switch } from '~/components/Atoms';
import { useAppStore } from '~/store/useAppStore';
import { useAuthStore } from '~/store/useAuthStore';

export const BetaSwitch = () => {
	const { user } = useAuthStore();

	const { isBetaMode, updateBetaMode } = useAppStore();

	const isStrativUser = useMemo(() => {
		const isStarativUser = user?.email?.includes('@strativ.se');
		if (!isStarativUser && isBetaMode) {
			updateBetaMode(false);
		}
		return isStarativUser;
	}, [user?.email, isBetaMode, updateBetaMode]);

	if (!isStrativUser) return null;

	return (
		<Space>
			<Typography.Text type='secondary'>Beta features</Typography.Text>
			<Switch
				checkedChildren='On'
				unCheckedChildren='Off'
				checked={isBetaMode}
				onChange={(checked) => updateBetaMode(checked)}
			/>
		</Space>
	);
};
