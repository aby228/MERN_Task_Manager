// React application entry point
// - Configures global telemetry (Sentry)
// - Sets axios defaults for cookie-based auth
// - Mounts top-level providers (Router, Auth)
// - Renders the root component
import React from 'react';

import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// Always send cookies with requests so the server can read the httpOnly JWT
axios.defaults.withCredentials = true;

// Basic Sentry setup for error monitoring and performance tracing
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN || '',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing in index.html');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    {/* Single top-level router for the entire app (avoid nested Routers) */}
    <BrowserRouter>
      {/* Provides authenticated user state and actions across the app */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
