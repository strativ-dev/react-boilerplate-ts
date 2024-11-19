import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import ConfigurationsProvider from './components/Providers/ConfigurationsProvider';
import ThemeProviderWrapper from './components/Providers/ThemeProviderWrapper';
import i18n from '@/lib/translation/i18n';
import { BaseRoutes } from '@/routes';

import { Spin } from '@/components/Atoms/Spin';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <ThemeProviderWrapper>
          <ErrorBoundary>
            <ConfigurationsProvider
              loading={<Spin type="window-centre" size="large" />}
            >
              <Suspense fallback={<Spin type="window-centre" size="large" />}>
                <BaseRoutes />
              </Suspense>
            </ConfigurationsProvider>
          </ErrorBoundary>
        </ThemeProviderWrapper>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
