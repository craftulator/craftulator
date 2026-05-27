import {createContext, useContext, useEffect, useMemo, useState} from 'react';

import {Button, ConfigProvider, Modal} from 'antd';
import {useIntl} from 'react-intl';
import {NavLink, Outlet, useLocation} from 'react-router-dom';

import type {AppShellContextValue, AppShellSettings} from './types.js';
import type {CSSProperties} from 'react';

import {CommonFooter} from '../../shared/ui/common-footer/index.js';
import {ThemeLogo} from '../../shared/ui/theme-logo/index.js';

import {LINK_EDITOR, LINK_HOME} from '@consts';

import {DEFAULT_THEME, DEFAULT_THEME_KEY, THEMES} from '../../shared/theme/index.js';
import {messages} from './messages.js';

const AppShellContext = createContext<AppShellContextValue | undefined>(undefined);

const defaultShellSettings: AppShellSettings = {
  helpSummary: messages.defaultHelpSummary,
  helpTitle: messages.defaultHelpTitle,
  themeKey: DEFAULT_THEME_KEY,
};

function getShellStyle(theme: typeof DEFAULT_THEME): CSSProperties {
  return {
    '--app-color-bg-container': theme.colorBgContainer,
    '--app-color-bg-layout': theme.colorBgLayout,
    '--app-color-border': theme.colorBorder,
    '--app-color-primary': theme.colorPrimary,
    '--app-color-text': theme.colorText,
    '--app-footer-background': theme.footerBackground,
    '--app-footer-text': theme.footerText,
    '--app-header-background': theme.headerBackground,
    '--app-header-text': theme.headerText,
  } as CSSProperties;
}

export function useAppShell(settings: AppShellSettings) {
  const context = useContext(AppShellContext);

  if (!context) {
    throw new Error('useAppShell must be used inside RootLayout');
  }

  useEffect(() => {
    context.setShellSettings(settings);
  }, [context, settings]);
}

export function RootLayout() {
  const {formatMessage} = useIntl();
  const location = useLocation();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [shellSettings, setShellSettings] = useState<AppShellSettings>(defaultShellSettings);
  const currentTheme = THEMES[shellSettings.themeKey] ?? DEFAULT_THEME;
  const shellStyle = useMemo(() => getShellStyle(currentTheme), [currentTheme]);
  const contextValue = useMemo<AppShellContextValue>(
    () => ({
      setShellSettings,
    }),
    [],
  );
  const isEditorRoute = location.pathname === LINK_EDITOR;
  const helpTitle = formatMessage(shellSettings.helpTitle);
  const helpSummary = formatMessage(shellSettings.helpSummary);
  const openHelpLabel = formatMessage(messages.openHelp);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: currentTheme.colorBgContainer,
          colorBgLayout: currentTheme.colorBgLayout,
          colorBorder: currentTheme.colorBorder,
          colorInfo: currentTheme.colorInfo,
          colorPrimary: currentTheme.colorPrimary,
          colorText: currentTheme.colorText,
        },
      }}
    >
      <AppShellContext.Provider value={contextValue}>
        <div
          className='app-shell'
          data-testid='app-shell'
          data-theme={shellSettings.themeKey}
          style={shellStyle}
        >
          <header className='app-header'>
            <NavLink
              className='app-brand'
              to={LINK_HOME}
            >
              <ThemeLogo themeKey={shellSettings.themeKey} />
              <span>{formatMessage(messages.brand)}</span>
            </NavLink>
            <nav
              aria-label='Primary navigation'
              className='app-nav'
            >
              {!isEditorRoute && (
                <NavLink
                  className='app-create-link'
                  to={LINK_EDITOR}
                >
                  {formatMessage(messages.create)}
                </NavLink>
              )}
              <Button
                aria-label={openHelpLabel}
                className='app-help-button'
                shape='circle'
                type='default'
                onClick={() => {
                  setIsHelpOpen(true);
                }}
              >
                <span aria-hidden='true'>?</span>
              </Button>
            </nav>
          </header>
          <main className='app-main'>
            <Outlet />
          </main>
          <CommonFooter />
          <Modal
            footer={null}
            open={isHelpOpen}
            title={helpTitle}
            onCancel={() => {
              setIsHelpOpen(false);
            }}
          >
            <p>{helpSummary}</p>
          </Modal>
        </div>
      </AppShellContext.Provider>
    </ConfigProvider>
  );
}
