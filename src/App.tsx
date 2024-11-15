import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App as AntApp } from 'antd';

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
    <QueryClientProvider client={queryClient}>
      <AntApp>
        <BaseRoutes />
        <GlobalStyles />
      </AntApp>
    </QueryClientProvider>
  );
}

export default App;
