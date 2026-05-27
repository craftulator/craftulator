# Shared App Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Milestone 4 shared foundations: themed app shell, header/help/footer, theme logos, GameInfo
placeholders, route-owned help/theme state, focused tests, and roadmap/docs updates.

**Architecture:** Add Ant Design as the UI foundation, keep route implementation in templates, and introduce shared
component folders for route-independent UI. `RootLayout` owns the shell provider and renders common chrome; templates
call a hook to set their current theme and help summary.

**Tech Stack:** React 19, React Router 7, React Intl, Ant Design 5.29.3, Vite, Vitest, Testing Library, TypeScript.

---

## File Structure

- Modify: `package.json` and `package-lock.json` to add exact `antd@5.29.3`.
- Create: `src/consts/links.ts` for `LINK_EDITOR`.
- Modify: `src/consts/rt.ts` for runtime theme defaults.
- Modify: `src/consts/index.ts` to re-export constant files only.
- Create: `src/shared/theme/consts.ts` for typed theme keys and values based on `assets/themes/themes.json`.
- Create: `src/shared/theme/index.ts` to export theme utilities.
- Create: `src/shared/ui/theme-logo/{index.ts,ui.tsx,types.ts}` for explicit theme image imports.
- Create: `src/shared/ui/common-footer/{index.ts,ui.tsx,messages.ts}` for the rights notice.
- Create: `src/shared/ui/game-info/{index.ts,ui.tsx,messages.ts,types.ts,ui.tests.tsx}` for reusable game info display.
- Modify: `src/layouts/root/{ui.tsx,messages.ts}` to implement the shell provider, header, modal, and footer.
- Create: `src/layouts/root/types.ts` for app shell context types.
- Modify: `src/templates/home/{ui.tsx,messages.ts}`, `src/templates/editor/{ui.tsx,messages.ts}`, and
  `src/templates/not-found/{ui.tsx,messages.ts}` to set route-owned shell state.
- Modify: `src/app/app-routes.tests.tsx` for shared shell behavior tests.
- Modify: `src/index.css` for CSS variables, fixed header layout, main spacing, and shared component styling.
- Modify: `docs/roadmap.md` to mark Milestone 4 items done.
- Add: `docs/logs/2026-05-27 00:00 UTC-main.md` and `docs/decisions/2026-05-27 00:00 UTC-main.md`, replacing `00:00`
  with the current UTC time when the task is completed.

---

### Task 1: Add Ant Design

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Install the exact dependency**

Run:

```bash
npm install --save-exact antd@5.29.3
```

Expected: `package.json` contains `"antd": "5.29.3"` without a semver range and `package-lock.json` is updated.

- [ ] **Step 2: Verify exact dependency policy**

Run:

```bash
node -e "const pkg=require('./package.json'); if (pkg.dependencies.antd !== '5.29.3') process.exit(1)"
```

Expected: command exits with code `0`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "build: add ant design"
```

---

### Task 2: Add Shared Constants And Theme Model

**Files:**

- Create: `src/consts/links.ts`
- Modify: `src/consts/rt.ts`
- Modify: `src/consts/index.ts`
- Create: `src/shared/theme/consts.ts`
- Create: `src/shared/theme/index.ts`

- [ ] **Step 1: Write the constants and theme test through existing routing coverage**

Update `src/app/app-routes.tests.tsx` with a test that expects the shell to receive the `general` theme on the home
route:

```tsx
it('applies the general theme to the home shell', () => {
  renderApp('/');

  expect(screen.getByTestId('app-shell')).toHaveAttribute('data-theme', 'general');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/app/app-routes.tests.tsx
```

Expected: FAIL because `data-testid="app-shell"` and `data-theme="general"` do not exist yet.

- [ ] **Step 3: Add constants**

Create `src/consts/links.ts`:

```ts
export const LINK_EDITOR = '/editor';
```

Update `src/consts/rt.ts`:

```ts
export const RT_LOCALE = 'en';
export const RT_DEFAULT_THEME_KEY = 'general';
```

Keep `src/consts/index.ts` as re-exports only:

```ts
export * from './links.js';
export * from './rt.js';
```

- [ ] **Step 4: Add theme definitions**

Create `src/shared/theme/consts.ts` by converting every entry from `assets/themes/themes.json` into a typed constant:

```ts
import {RT_DEFAULT_THEME_KEY} from '@consts';

export type ThemeKey =
  | 'general'
  | 'precise'
  | 'engineering'
  | 'space'
  | 'alchemical'
  | 'fantasy'
  | 'biological'
  | 'animal'
  | 'medieval'
  | 'futuristic'
  | 'esoteric';

export type CraftulatorTheme = {
  colorPrimary: string;
  colorInfo: string;
  colorBgLayout: string;
  colorBgContainer: string;
  colorText: string;
  colorBorder: string;
  headerBackground: string;
  headerText: string;
  footerBackground: string;
  footerText: string;
};

export const THEME_KEYS = [
  'general',
  'precise',
  'engineering',
  'space',
  'alchemical',
  'fantasy',
  'biological',
  'animal',
  'medieval',
  'futuristic',
  'esoteric',
] as const satisfies readonly ThemeKey[];

export const THEMES: Record<ThemeKey, CraftulatorTheme> = {
  general: {
    colorPrimary: '#1f7a8c',
    colorInfo: '#1f7a8c',
    colorBgLayout: '#f1f7fa',
    colorBgContainer: '#ffffff',
    colorText: '#102a43',
    colorBorder: '#b9cbd3',
    headerBackground: '#1f7a8c',
    headerText: '#f0fbff',
    footerBackground: '#102a43',
    footerText: '#d9e2ec',
  },
  precise: {
    colorPrimary: '#1f9aa0',
    colorInfo: '#1f9aa0',
    colorBgLayout: '#eef8f9',
    colorBgContainer: '#fbfeff',
    colorText: '#172a31',
    colorBorder: '#9ccdd1',
    headerBackground: '#263238',
    headerText: '#e9fbfc',
    footerBackground: '#172126',
    footerText: '#cde9eb',
  },
  engineering: {
    colorPrimary: '#6f7882',
    colorInfo: '#6f7882',
    colorBgLayout: '#f4f2ee',
    colorBgContainer: '#fffdf8',
    colorText: '#24292e',
    colorBorder: '#c4beb4',
    headerBackground: '#2d3135',
    headerText: '#f4f1ea',
    footerBackground: '#1f2225',
    footerText: '#d7d2ca',
  },
  space: {
    colorPrimary: '#1689d9',
    colorInfo: '#1689d9',
    colorBgLayout: '#edf6ff',
    colorBgContainer: '#fafdff',
    colorText: '#10233d',
    colorBorder: '#9cc7eb',
    headerBackground: '#102642',
    headerText: '#e6f4ff',
    footerBackground: '#08182b',
    footerText: '#c7def4',
  },
  alchemical: {
    colorPrimary: '#b8860b',
    colorInfo: '#b8860b',
    colorBgLayout: '#fbf4e4',
    colorBgContainer: '#fffaf0',
    colorText: '#3a2a12',
    colorBorder: '#d7bc78',
    headerBackground: '#5a3917',
    headerText: '#fff4d6',
    footerBackground: '#2f1f10',
    footerText: '#edd9ad',
  },
  fantasy: {
    colorPrimary: '#2f6edb',
    colorInfo: '#2f6edb',
    colorBgLayout: '#eef4ff',
    colorBgContainer: '#fbfdff',
    colorText: '#182642',
    colorBorder: '#aebee0',
    headerBackground: '#3b2f25',
    headerText: '#edf4ff',
    footerBackground: '#221b17',
    footerText: '#d8d2c8',
  },
  biological: {
    colorPrimary: '#5f8f22',
    colorInfo: '#5f8f22',
    colorBgLayout: '#f1f8e9',
    colorBgContainer: '#fbfff7',
    colorText: '#203516',
    colorBorder: '#b7cf9a',
    headerBackground: '#23401f',
    headerText: '#f0ffe6',
    footerBackground: '#152713',
    footerText: '#cfe4c0',
  },
  animal: {
    colorPrimary: '#a8632f',
    colorInfo: '#a8632f',
    colorBgLayout: '#f8efe3',
    colorBgContainer: '#fffaf3',
    colorText: '#3b2618',
    colorBorder: '#d2aa82',
    headerBackground: '#4a2f22',
    headerText: '#fff1df',
    footerBackground: '#2b1c15',
    footerText: '#e6cdb5',
  },
  medieval: {
    colorPrimary: '#7a4a2a',
    colorInfo: '#7a4a2a',
    colorBgLayout: '#f3eee7',
    colorBgContainer: '#fffaf2',
    colorText: '#2f261e',
    colorBorder: '#bca88f',
    headerBackground: '#2e2a27',
    headerText: '#f2e6d5',
    footerBackground: '#1d1a18',
    footerText: '#d6c6b3',
  },
  futuristic: {
    colorPrimary: '#10aeea',
    colorInfo: '#10aeea',
    colorBgLayout: '#edf8fc',
    colorBgContainer: '#f9feff',
    colorText: '#102a35',
    colorBorder: '#90d8eb',
    headerBackground: '#11181f',
    headerText: '#e1fbff',
    footerBackground: '#080d12',
    footerText: '#bceaf5',
  },
  esoteric: {
    colorPrimary: '#7a35c8',
    colorInfo: '#7a35c8',
    colorBgLayout: '#f4eff8',
    colorBgContainer: '#fffbff',
    colorText: '#251733',
    colorBorder: '#c2a8dd',
    headerBackground: '#1f1630',
    headerText: '#f5eaff',
    footerBackground: '#120c1d',
    footerText: '#dcc7f0',
  },
};

export const DEFAULT_THEME_KEY = RT_DEFAULT_THEME_KEY satisfies ThemeKey;
export const DEFAULT_THEME = THEMES[DEFAULT_THEME_KEY];
```

Create `src/shared/theme/index.ts`:

```ts
export * from './consts.js';
```

- [ ] **Step 5: Run the test**

Run:

```bash
npm test -- src/app/app-routes.tests.tsx
```

Expected: still FAIL until the shell is implemented in the next task.

- [ ] **Step 6: Commit**

```bash
git add src/consts src/shared/theme src/app/app-routes.tests.tsx
git commit -m "feat: add shared theme constants"
```

---

### Task 3: Add ThemeLogo, CommonFooter, And GameInfo

**Files:**

- Create: `src/shared/ui/theme-logo/index.ts`
- Create: `src/shared/ui/theme-logo/ui.tsx`
- Create: `src/shared/ui/theme-logo/types.ts`
- Create: `src/shared/ui/common-footer/index.ts`
- Create: `src/shared/ui/common-footer/ui.tsx`
- Create: `src/shared/ui/common-footer/messages.ts`
- Create: `src/shared/ui/game-info/index.ts`
- Create: `src/shared/ui/game-info/ui.tsx`
- Create: `src/shared/ui/game-info/messages.ts`
- Create: `src/shared/ui/game-info/types.ts`
- Create: `src/shared/ui/game-info/ui.tests.tsx`

- [ ] **Step 1: Write failing GameInfo tests**

Create `src/shared/ui/game-info/ui.tests.tsx`:

```tsx
import '@testing-library/jest-dom/vitest';

import {cleanup, render, screen} from '@testing-library/react';
import type {ReactElement} from 'react';
import {RawIntlProvider, createIntl, createIntlCache} from 'react-intl';
import {afterEach, describe, expect, it} from 'vitest';

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
```

- [ ] **Step 2: Run tests to verify failure**

Run:

```bash
npm test -- src/shared/ui/game-info/ui.tests.tsx
```

Expected: FAIL because `GameInfo` does not exist.

- [ ] **Step 3: Implement ThemeLogo**

Create `src/shared/ui/theme-logo/types.ts`:

```ts
import type {ThemeKey} from '@shared/theme';

export type ThemeLogoProps = {
  themeKey: ThemeKey;
};
```

Create `src/shared/ui/theme-logo/ui.tsx` with explicit imports from `assets/themes/images`:

```tsx
import animalLogo from '../../../../assets/themes/images/animal.png';
import alchemicalLogo from '../../../../assets/themes/images/alchemical.png';
import biologicalLogo from '../../../../assets/themes/images/biological.png';
import engineeringLogo from '../../../../assets/themes/images/engineering.png';
import esotericLogo from '../../../../assets/themes/images/esoteric.png';
import fantasyLogo from '../../../../assets/themes/images/fantasy.png';
import futuristicLogo from '../../../../assets/themes/images/futuristic.png';
import generalLogo from '../../../../assets/themes/images/general.png';
import medievalLogo from '../../../../assets/themes/images/medieval.png';
import preciseLogo from '../../../../assets/themes/images/precise.png';
import spaceLogo from '../../../../assets/themes/images/space.png';

import type {ThemeKey} from '@shared/theme';

import type {ThemeLogoProps} from './types.js';

const themeLogoByKey: Record<ThemeKey, string> = {
  alchemical: alchemicalLogo,
  animal: animalLogo,
  biological: biologicalLogo,
  engineering: engineeringLogo,
  esoteric: esotericLogo,
  fantasy: fantasyLogo,
  futuristic: futuristicLogo,
  general: generalLogo,
  medieval: medievalLogo,
  precise: preciseLogo,
  space: spaceLogo,
};

export function ThemeLogo({themeKey}: ThemeLogoProps) {
  return (
    <img
      alt=''
      aria-hidden='true'
      className='theme-logo'
      src={themeLogoByKey[themeKey]}
    />
  );
}
```

Create `src/shared/ui/theme-logo/index.ts`:

```ts
export {ThemeLogo} from './ui.js';
export type {ThemeLogoProps} from './types.js';
```

- [ ] **Step 4: Implement CommonFooter**

Create `src/shared/ui/common-footer/messages.ts`:

```ts
import {defineMessages} from 'react-intl';

export const messages = defineMessages({
  rightsNotice: {
    defaultMessage: 'All game names, logos, and assets belong to their respective owners.',
    id: 'commonFooter.rightsNotice',
  },
});
```

Create `src/shared/ui/common-footer/ui.tsx`:

```tsx
import {useIntl} from 'react-intl';

import {messages} from './messages.js';

export function CommonFooter() {
  const {formatMessage} = useIntl();

  return <footer className='common-footer'>{formatMessage(messages.rightsNotice)}</footer>;
}
```

Create `src/shared/ui/common-footer/index.ts`:

```ts
export {CommonFooter} from './ui.js';
```

- [ ] **Step 5: Implement GameInfo**

Create `src/shared/ui/game-info/types.ts`:

```ts
export type GameInfoProps = {
  name?: string;
  image?: string;
  description?: string;
  link?: string;
};
```

Create `src/shared/ui/game-info/messages.ts`:

```ts
import {defineMessages} from 'react-intl';

export const messages = defineMessages({
  imageAlt: {
    defaultMessage: '{name} logo',
    id: 'gameInfo.imageAlt',
  },
  linkPlaceholder: {
    defaultMessage: 'No game link yet.',
    id: 'gameInfo.linkPlaceholder',
  },
  linkText: {
    defaultMessage: 'Open game page',
    id: 'gameInfo.linkText',
  },
  logoPlaceholder: {
    defaultMessage: 'No game logo yet',
    id: 'gameInfo.logoPlaceholder',
  },
  namePlaceholder: {
    defaultMessage: 'Untitled game',
    id: 'gameInfo.namePlaceholder',
  },
  descriptionPlaceholder: {
    defaultMessage: 'No description yet.',
    id: 'gameInfo.descriptionPlaceholder',
  },
});
```

Create `src/shared/ui/game-info/ui.tsx`:

```tsx
import {Button} from 'antd';
import {useIntl} from 'react-intl';

import {messages} from './messages.js';

import type {GameInfoProps} from './types.js';

export function GameInfo({name, image, description, link}: GameInfoProps) {
  const {formatMessage} = useIntl();
  const displayName = name?.trim() || formatMessage(messages.namePlaceholder);
  const displayDescription = description?.trim() || formatMessage(messages.descriptionPlaceholder);

  return (
    <article className='game-info'>
      <div className='game-info__image'>
        {image ? (
          <img
            alt={formatMessage(messages.imageAlt, {name: displayName})}
            src={image}
          />
        ) : (
          <span>{formatMessage(messages.logoPlaceholder)}</span>
        )}
      </div>
      <div className='game-info__body'>
        <h2>{displayName}</h2>
        <p>{displayDescription}</p>
        {link ? (
          <Button
            href={link}
            target='_blank'
            rel='noreferrer'
            type='link'
          >
            {formatMessage(messages.linkText)}
          </Button>
        ) : (
          <p className='game-info__placeholder'>{formatMessage(messages.linkPlaceholder)}</p>
        )}
      </div>
    </article>
  );
}
```

Create `src/shared/ui/game-info/index.ts`:

```ts
export {GameInfo} from './ui.js';
export type {GameInfoProps} from './types.js';
```

- [ ] **Step 6: Run GameInfo tests**

Run:

```bash
npm test -- src/shared/ui/game-info/ui.tests.tsx
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/shared/ui
git commit -m "feat: add shared display components"
```

---

### Task 4: Implement Root Shell And Route-Owned Help State

**Files:**

- Modify: `src/layouts/root/ui.tsx`
- Modify: `src/layouts/root/messages.ts`
- Create: `src/layouts/root/types.ts`
- Modify: `src/layouts/root/index.ts`
- Modify: `src/templates/home/ui.tsx`
- Modify: `src/templates/home/messages.ts`
- Modify: `src/templates/editor/ui.tsx`
- Modify: `src/templates/editor/messages.ts`
- Modify: `src/templates/not-found/ui.tsx`
- Modify: `src/templates/not-found/messages.ts`
- Modify: `src/app/app-routes.tests.tsx`
- Modify: `src/index.css`

- [ ] **Step 1: Add failing shell behavior tests**

Update `src/app/app-routes.tests.tsx` with these tests:

```tsx
it('shows the Create link outside the editor route', () => {
  renderApp('/');

  expect(screen.getByRole('link', {name: 'Create'})).toHaveAttribute('href', '/editor');
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
```

Add `fireEvent` to the existing Testing Library import:

```tsx
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
```

- [ ] **Step 2: Run routing tests to verify failure**

Run:

```bash
npm test -- src/app/app-routes.tests.tsx
```

Expected: FAIL because the shell context, AntD header buttons, and modal are not implemented.

- [ ] **Step 3: Implement root shell types**

Create `src/layouts/root/types.ts`:

```ts
import type {ThemeKey} from '@shared/theme';
import type {MessageDescriptor} from 'react-intl';

export type AppShellSettings = {
  themeKey: ThemeKey;
  helpTitle: MessageDescriptor;
  helpSummary: MessageDescriptor;
};

export type AppShellContextValue = {
  setShellSettings: (settings: AppShellSettings) => void;
};
```

- [ ] **Step 4: Implement root messages**

Update `src/layouts/root/messages.ts`:

```ts
import {defineMessages} from 'react-intl';

export const messages = defineMessages({
  brand: {
    defaultMessage: 'Craftulator',
    id: 'app.brand',
  },
  create: {
    defaultMessage: 'Create',
    id: 'nav.create',
  },
  defaultHelpSummary: {
    defaultMessage: 'Craftulator helps organize production-chain calculator data for factory games.',
    id: 'help.defaultSummary',
  },
  defaultHelpTitle: {
    defaultMessage: 'About this page',
    id: 'help.defaultTitle',
  },
  openHelp: {
    defaultMessage: 'Open help',
    id: 'help.open',
  },
});
```

- [ ] **Step 5: Implement RootLayout**

Update `src/layouts/root/ui.tsx`:

```tsx
import {LINK_EDITOR} from '@consts';
import {Button, ConfigProvider, Modal} from 'antd';
import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {NavLink, Outlet, useLocation} from 'react-router-dom';

import {CommonFooter} from '@shared/ui/common-footer';
import {ThemeLogo} from '@shared/ui/theme-logo';

import {DEFAULT_THEME, DEFAULT_THEME_KEY, THEMES} from '@shared/theme';

import {messages} from './messages.js';

import type {AppShellContextValue, AppShellSettings} from './types.js';
import type {CSSProperties, ReactNode} from 'react';

const AppShellContext = createContext<AppShellContextValue | null>(null);

const defaultShellSettings: AppShellSettings = {
  helpSummary: messages.defaultHelpSummary,
  helpTitle: messages.defaultHelpTitle,
  themeKey: DEFAULT_THEME_KEY,
};

export function useAppShell(settings: AppShellSettings) {
  const context = useContext(AppShellContext);

  if (!context) {
    throw new Error('useAppShell must be used inside RootLayout');
  }

  useEffect(() => {
    context.setShellSettings(settings);
  }, [context, settings]);
}

function getThemeStyle(themeKey: AppShellSettings['themeKey']): CSSProperties {
  const theme = THEMES[themeKey] ?? DEFAULT_THEME;

  return {
    '--app-bg-layout': theme.colorBgLayout,
    '--app-bg-container': theme.colorBgContainer,
    '--app-border': theme.colorBorder,
    '--app-footer-bg': theme.footerBackground,
    '--app-footer-text': theme.footerText,
    '--app-header-bg': theme.headerBackground,
    '--app-header-text': theme.headerText,
    '--app-primary': theme.colorPrimary,
    '--app-text': theme.colorText,
  } as CSSProperties;
}

export function RootLayout() {
  const {formatMessage} = useIntl();
  const location = useLocation();
  const [helpOpen, setHelpOpen] = useState(false);
  const [shellSettings, setShellSettings] = useState<AppShellSettings>(defaultShellSettings);
  const theme = THEMES[shellSettings.themeKey] ?? DEFAULT_THEME;
  const contextValue = useMemo(() => ({setShellSettings}), []);
  const hideCreateLink = location.pathname === LINK_EDITOR;

  return (
    <AppShellContext.Provider value={contextValue}>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: theme.colorBgContainer,
            colorBgLayout: theme.colorBgLayout,
            colorBorder: theme.colorBorder,
            colorInfo: theme.colorInfo,
            colorPrimary: theme.colorPrimary,
            colorText: theme.colorText,
          },
        }}
      >
        <div
          className='app-shell'
          data-testid='app-shell'
          data-theme={shellSettings.themeKey}
          style={getThemeStyle(shellSettings.themeKey)}
        >
          <header className='app-header'>
            <NavLink
              className='app-brand'
              to='/'
            >
              <ThemeLogo themeKey={shellSettings.themeKey} />
              <span>{formatMessage(messages.brand)}</span>
            </NavLink>
            <nav
              aria-label='Primary navigation'
              className='app-nav'
            >
              {!hideCreateLink ? (
                <Button
                  href={LINK_EDITOR}
                  type='primary'
                >
                  {formatMessage(messages.create)}
                </Button>
              ) : null}
              <Button
                aria-label={formatMessage(messages.openHelp)}
                shape='circle'
                onClick={() => {
                  setHelpOpen(true);
                }}
              >
                ?
              </Button>
            </nav>
          </header>
          <main className='app-main'>
            <Outlet />
          </main>
          <CommonFooter />
          <Modal
            footer={null}
            onCancel={() => {
              setHelpOpen(false);
            }}
            open={helpOpen}
            title={formatMessage(shellSettings.helpTitle)}
          >
            <p>{formatMessage(shellSettings.helpSummary)}</p>
          </Modal>
        </div>
      </ConfigProvider>
    </AppShellContext.Provider>
  );
}
```

Update `src/layouts/root/index.ts`:

```ts
export {RootLayout, useAppShell} from './ui.js';
export type {AppShellSettings} from './types.js';
```

- [ ] **Step 6: Update route templates**

Each template must create a stable shell settings object with `useMemo()` and call `useAppShell(settings)`.

Home help copy:

```ts
helpSummary: {
  defaultMessage: 'Browse available calculators and create new game data from the shared editor.',
  id: 'home.helpSummary',
},
helpTitle: {
  defaultMessage: 'Home help',
  id: 'home.helpTitle',
},
```

Editor help copy:

```ts
helpSummary: {
  defaultMessage: 'Create and edit Craftulator game data before exporting it as JSON.',
  id: 'editor.helpSummary',
},
helpTitle: {
  defaultMessage: 'Editor help',
  id: 'editor.helpTitle',
},
```

Not found help copy:

```ts
helpSummary: {
  defaultMessage: 'Use the header actions to return home or start creating calculator data.',
  id: 'notFound.helpSummary',
},
helpTitle: {
  defaultMessage: 'Not found help',
  id: 'notFound.helpTitle',
},
```

Template pattern:

```tsx
import {DEFAULT_THEME_KEY} from '@shared/theme';
import {useMemo} from 'react';
import {useIntl} from 'react-intl';

import {useAppShell} from '@layouts/root';

import {messages} from './messages.js';

export function HomeTemplate() {
  const {formatMessage} = useIntl();
  const shellSettings = useMemo(
    () => ({
      helpSummary: messages.helpSummary,
      helpTitle: messages.helpTitle,
      themeKey: DEFAULT_THEME_KEY,
    }),
    [],
  );

  useAppShell(shellSettings);

  return (
    <section className='page'>
      <h1>{formatMessage(messages.title)}</h1>
      <p>{formatMessage(messages.description)}</p>
    </section>
  );
}
```

- [ ] **Step 7: Update styles**

Update `src/index.css` so `.app-shell` uses CSS variables, `.app-header` is fixed, `.app-main` has top padding for the
fixed header, `.theme-logo`, `.common-footer`, and `.game-info` are styled with responsive stable dimensions.

- [ ] **Step 8: Run routing tests**

Run:

```bash
npm test -- src/app/app-routes.tests.tsx
```

Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/layouts/root src/templates src/app/app-routes.tests.tsx src/index.css
git commit -m "feat: add themed app shell"
```

---

### Task 5: Roadmap, Logs, Full Verification

**Files:**

- Modify: `docs/roadmap.md`
- Create: `docs/logs/2026-05-27 HH:mm UTC-main.md`
- Create: `docs/decisions/2026-05-27 HH:mm UTC-main.md`

- [ ] **Step 1: Mark Milestone 4 complete**

In `docs/roadmap.md`, change each Milestone 4 checkbox from `[ ]` to `[x]` only after all implementation tests pass.

- [ ] **Step 2: Add task log**

Create a log file named with the current UTC time and branch:

```md
# Shared App Foundations

- Implemented Milestone 4 shared foundations.
- Added exact `antd@5.29.3`.
- Added shared theme constants, explicit theme logo imports, route-owned shell settings, fixed header, help modal,
  `CommonFooter`, and `GameInfo`.
- Added focused tests for shared shell behavior and `GameInfo` placeholders.
- Verified with `npm run check`.
```

- [ ] **Step 3: Add decision record**

Create a decision file named with the current UTC time and branch:

```md
- Context: Milestone 4 needs shared app foundations before home and editor feature work.
- Decision: Use route-owned theme and help settings with a generic root shell, and add Ant Design v5 as the shared UI
  foundation.
- Consequences: Future editor work can update the active theme from editor state without central route configuration,
  while shared components can reuse Ant Design and theme constants.
- Status: accepted
```

- [ ] **Step 4: Run focused tests**

Run:

```bash
npm test -- src/app/app-routes.tests.tsx src/shared/ui/game-info/ui.tests.tsx
```

Expected: PASS.

- [ ] **Step 5: Run full check**

Run:

```bash
npm run check
```

Expected: PASS for typecheck, lint, format check, tests, and build.

- [ ] **Step 6: Commit**

```bash
git add docs/roadmap.md docs/logs docs/decisions
git commit -m "docs: record shared app foundations milestone"
```

---

## Plan Self-Review

- Spec coverage: The plan covers AntD, shared theme constants, route-independent constants, React Intl descriptors, root
  shell, fixed header, `/editor` Create-link hiding, per-page help modal summaries, `CommonFooter`, `GameInfo`, focused
  tests, roadmap, log, and decision docs.
- Placeholder scan: No unresolved marker text or deferred implementation placeholders remain. Placeholder UI text is
  intentional product behavior for `GameInfo`.
- Type consistency: `ThemeKey`, `AppShellSettings`, `GameInfoProps`, and component exports are introduced before use.
