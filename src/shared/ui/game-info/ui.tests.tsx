import '@testing-library/jest-dom/vitest';

import {cleanup, render, screen} from '@testing-library/react';
import {createIntl, createIntlCache, RawIntlProvider} from 'react-intl';
import {afterEach, describe, expect, it} from 'vitest';

import type {ReactElement} from 'react';

import {GameInfo} from './index.js';

const intl = createIntl(
  {
    defaultLocale: 'en',
    locale: 'en',
    messages: {},
  },
  createIntlCache(),
);

function renderGameInfo(element: ReactElement) {
  render(<RawIntlProvider value={intl}>{element}</RawIntlProvider>);
}

afterEach(() => {
  cleanup();
});

describe('GameInfo', () => {
  it('renders placeholders for missing game values', () => {
    renderGameInfo(<GameInfo />);

    expect(screen.getByRole('heading', {name: 'Untitled game'})).toBeInTheDocument();
    expect(screen.getByText('No game logo yet')).toBeInTheDocument();
    expect(screen.getByText('No description yet.')).toBeInTheDocument();
    expect(screen.getByText('No game link yet.')).toBeInTheDocument();
  });

  it('renders provided game values', () => {
    renderGameInfo(
      <GameInfo
        name='Factorio'
        image='data:image/png;base64,abc'
        description='Factory automation game.'
        link='https://factorio.com/'
      />,
    );

    expect(screen.getByRole('heading', {name: 'Factorio'})).toBeInTheDocument();
    expect(screen.getByRole('img', {name: 'Factorio logo'})).toHaveAttribute('src', 'data:image/png;base64,abc');
    expect(screen.getByText('Factory automation game.')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Open game page'})).toHaveAttribute('href', 'https://factorio.com/');
  });
});
