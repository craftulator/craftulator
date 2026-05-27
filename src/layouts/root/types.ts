import type {ThemeKey} from '../../shared/theme/index.js';
import type {MessageDescriptor} from 'react-intl';

export type AppShellSettings = {
  themeKey: ThemeKey;
  helpTitle: MessageDescriptor;
  helpSummary: MessageDescriptor;
};

export type AppShellContextValue = {
  setShellSettings: (settings: AppShellSettings) => void;
};
