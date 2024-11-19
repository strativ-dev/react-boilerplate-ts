import { App, ConfigProvider, GlobalToken, theme, ThemeConfig } from 'antd';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '@/lib/theme/globals';
import useAppStore from '@/stores/useAppStore';

interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  const primaryColor = useAppStore((state) => state.primaryColor);

  const themeConfig: ThemeConfig = {
    token: {
      colorPrimary: primaryColor,
      colorLink: primaryColor,
    },
  };

  const globalToken = primaryColor
    ? theme.getDesignToken(themeConfig)
    : ({} as GlobalToken);

  return (
    <ConfigProvider theme={themeConfig}>
      <ThemeProvider theme={{ ...globalToken, mode: 'light' }}>
        <App>
          {children}
          <GlobalStyles />
        </App>
      </ThemeProvider>
    </ConfigProvider>
  );
};

export default ThemeProviderWrapper;
