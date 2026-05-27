import '@testing-library/jest-dom/vitest';

import {cleanup, render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import {afterEach, describe, expect, it} from 'vitest';

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

afterEach(() => {
  cleanup();
});

describe('App routing and localization', () => {
  it('renders the localized home route through the pages layer', () => {
    renderApp('/');

    expect(screen.getByRole('heading', {name: 'Craftulator'})).toBeInTheDocument();
    expect(screen.getByText('Plan production chains for your favorite factory games.')).toBeInTheDocument();
  });

  it('applies the general theme to the home shell', () => {
    renderApp('/');

    expect(screen.getByTestId('app-shell')).toHaveAttribute('data-theme', 'general');
  });

  it('renders the localized editor route through the pages layer', () => {
    renderApp('/editor');

    expect(screen.getByRole('heading', {name: 'Editor'})).toBeInTheDocument();
    expect(screen.getByText('Create and edit Craftulator game data.')).toBeInTheDocument();
  });

  it.each(['/missing', '/about', '/games/factorio/calculator'])(
    'renders the localized not found route for %s through the pages layer',
    (initialPath) => {
      renderApp(initialPath);

      expect(screen.getByRole('heading', {name: 'Page not found'})).toBeInTheDocument();
      expect(screen.getByText('Choose another route from the navigation.')).toBeInTheDocument();
    },
  );
});
