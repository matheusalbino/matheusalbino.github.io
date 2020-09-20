import './style/base.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { version } from '../package.json';
import { Index } from './pages/index';

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  release: version,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV ?? 'development',
  debug: process.env.NODE_ENV !== 'production'
});

const Root = Sentry.withProfiler(Index);

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={'An error has occured'}>
      <Root />
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
