import './style/base.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import Package from '../package.json';
import { Index } from './pages/index';
import { ThemeSettings } from './common/Theme';
import DarkTheme from './themes/DarkTheme';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
    release: Package.version,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV ?? 'development',
    debug: process.env.NODE_ENV !== 'production'
  });
}

const Root = Sentry.withProfiler(Index);

ReactDOM.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={'An error has occured'}>
      <ThemeSettings theme={DarkTheme}>
        <Root />
      </ThemeSettings>
    </Sentry.ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
