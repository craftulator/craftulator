import {useMemo} from 'react';

import {useIntl} from 'react-intl';

import type {AppShellSettings} from '@layouts/root';

import {useAppShell} from '@layouts/root';

import {DEFAULT_THEME_KEY} from '../../shared/theme/index.js';
import {messages} from './messages.js';

export function NotFoundTemplate() {
  const {formatMessage} = useIntl();
  const shellSettings = useMemo<AppShellSettings>(
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
