import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntApp } from 'antd';
import { I18nextProvider } from 'react-i18next';

import i18n from '@/lib/translation/i18n';
import GlobalStyles from '@/assets/theme/globals';
import { BaseRoutes } from '@/routes';

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
        <AntApp>
          <BaseRoutes />
          <GlobalStyles />
        </AntApp>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
