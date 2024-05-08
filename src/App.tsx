import { App } from 'antd';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { GlobalStyles } from './assets/styles/styled';
import { Spin } from './components/Atoms';
import { ErrorBoundary } from './components/ErrorBoundary';
import ConfigurationsProvider from './components/Providers/ConfigurationsProvider';
import { BaseRoutes } from './routes';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

const MyApp = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ConfigurationsProvider loading={<Spin type='window-centre' size='large' noColor />}>
				<Suspense fallback={<Spin type='window-centre' size='large' />}>
					<ErrorBoundary>
						<App>
							<BaseRoutes />
							<GlobalStyles />
						</App>
					</ErrorBoundary>
				</Suspense>
			</ConfigurationsProvider>
			<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
		</QueryClientProvider>
	);
};

export default MyApp;
