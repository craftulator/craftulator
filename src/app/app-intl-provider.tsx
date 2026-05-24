import {intl} from '@intl';
import {RawIntlProvider} from 'react-intl';

import type {ReactNode} from 'react';

type AppIntlProviderProps = {
  children: ReactNode;
};

export function AppIntlProvider({children}: AppIntlProviderProps) {
  return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
}
