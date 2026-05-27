import '@testing-library/jest-dom/vitest';

import {cleanup, fireEvent, render, screen} from '@testing-library/react';
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

  it('navigates to the editor route from the Create action outside the editor route', () => {
    renderApp('/');

    const createLink = screen.getByRole('link', {name: 'Create'});

    expect(createLink).toHaveAttribute('href', '/editor');

    fireEvent.click(createLink);

    expect(screen.getByRole('heading', {name: 'Editor'})).toBeInTheDocument();
    expect(screen.getByText('Create and edit Craftulator game data.')).toBeInTheDocument();
  });

  it('renders the localized editor route through the pages layer', () => {
    renderApp('/editor');

    expect(screen.getByRole('heading', {name: 'Editor'})).toBeInTheDocument();
    expect(screen.getByText('Create and edit Craftulator game data.')).toBeInTheDocument();
  });

  it('hides the Create link on the editor route', () => {
    renderApp('/editor');

    expect(screen.queryByRole('link', {name: 'Create'})).not.toBeInTheDocument();
  });

  it('opens route-specific help content from the header', () => {
    renderApp('/editor');

    fireEvent.click(screen.getByRole('button', {name: 'Open help'}));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Create and edit Craftulator game data before exporting it as JSON.')).toBeInTheDocument();
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
