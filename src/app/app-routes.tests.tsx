import '@testing-library/jest-dom/vitest';

import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {describe, expect, it} from 'vitest';

import {AppIntlProvider, AppRoutes} from './index.js';

function renderApp(initialPath: string) {
  render(
    <AppIntlProvider>
      <MemoryRouter initialEntries={[initialPath]}>
        <AppRoutes />
      </MemoryRouter>
    </AppIntlProvider>,
  );
}

describe('App routing and localization', () => {
  it('renders the localized home route through the pages layer', () => {
    renderApp('/');

    expect(screen.getByRole('heading', {name: 'Craftulator'})).toBeInTheDocument();
    expect(screen.getByText('Plan production chains for your favorite factory games.')).toBeInTheDocument();
  });

  it('renders the localized about route through the pages layer', () => {
    renderApp('/about');

    expect(screen.getByRole('heading', {name: 'About Craftulator'})).toBeInTheDocument();
    expect(screen.getByText('Craftulator helps build and share game production calculators.')).toBeInTheDocument();
  });

  it('renders the localized not found route through the pages layer', () => {
    renderApp('/missing');

    expect(screen.getByRole('heading', {name: 'Page not found'})).toBeInTheDocument();
    expect(screen.getByText('Choose another route from the navigation.')).toBeInTheDocument();
  });
});
