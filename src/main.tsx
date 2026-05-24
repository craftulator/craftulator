import {StrictMode} from 'react';

import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {AppIntlProvider, AppRoutes} from './app/index.js';

import './index.css';

const rootElement = document.querySelector('#root');

if (rootElement === null) {
  throw new Error('Root element #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <AppIntlProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppIntlProvider>
  </StrictMode>,
);
