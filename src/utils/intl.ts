import {createIntl, createIntlCache} from 'react-intl';

import {RT_LOCALE} from '@consts';

export const supportedLocales = [RT_LOCALE] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale: SupportedLocale = RT_LOCALE;

const intlCache = createIntlCache();

export const intl = createIntl(
  {
    defaultLocale,
    locale: defaultLocale,
    messages: {},
  },
  intlCache,
);
