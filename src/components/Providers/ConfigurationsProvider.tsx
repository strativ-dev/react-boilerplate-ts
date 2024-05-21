import { ConfigProvider, GlobalToken, theme, ThemeConfig } from 'antd';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import React, { FC, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useShallow } from 'zustand/react/shallow';

import useConfigurations from '@/components/Providers/useConfigurations';
import useAppStore from '@/store/useAppStore';

interface Props {
	loading: React.ReactNode;
	children: React.ReactNode;
}

const ConfigurationsProvider: FC<Props> = ({ loading, children }: Props) => {
	const { data, isLoading } = useConfigurations();
	const { primaryColor, darkMode, compactMode } = useAppStore(useShallow((state) => state));

	const algorithm = [darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm];

	const themeConfig: ThemeConfig = {
		algorithm: compactMode ? [...algorithm, theme.compactAlgorithm] : algorithm,
		token: {
			colorPrimary: primaryColor,
			colorLink: primaryColor,
			fontFamily: 'Inter',
		},
	};

	dayjs.extend(updateLocale);
	dayjs.updateLocale('en', {
		weekStart: 1,
	});

	const globalToken = primaryColor ? theme.getDesignToken(themeConfig) : ({} as GlobalToken);

	useEffect(() => {
		if (!data) return;
		document.title = `Booking System ${data?.company_name ? '|' : ''} ${data?.company_name || ''}`;
		const favicon: HTMLAnchorElement | null = document.querySelector("link[rel*='icon']");
		if (data?.favicon && favicon) favicon.href = data.favicon;
	}, [data]);

	if (isLoading) return <>{loading}</>;

	return (
		<ConfigProvider theme={themeConfig}>
			<ThemeProvider theme={{ ...globalToken, mode: darkMode ? 'dark' : 'light' }}>
				{children}
			</ThemeProvider>
		</ConfigProvider>
	);
};

export default ConfigurationsProvider;
