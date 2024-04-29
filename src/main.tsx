import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import 'nprogress/nprogress.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '~/assets/styles/fonts.css';
import App from './App';
import config from './config';
import './config/translate';

Sentry.init({
	dsn: config.sentryDSN,
	integrations: [new BrowserTracing()],
	tracesSampleRate: 1.0,
	enabled: !!config.sentryEnv,
	environment: config.sentryEnv,
});

const element = document.getElementById('root');
const root = createRoot(element as HTMLElement);
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
