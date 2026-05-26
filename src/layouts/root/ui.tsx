import {useIntl} from 'react-intl';
import {NavLink, Outlet} from 'react-router-dom';

import {messages} from './messages.js';

export function RootLayout() {
  const {formatMessage} = useIntl();

  return (
    <div className='app-shell'>
      <header className='app-header'>
        <NavLink
          className='app-brand'
          to='/'
        >
          {formatMessage(messages.brand)}
        </NavLink>
        <nav
          aria-label='Primary navigation'
          className='app-nav'
        >
          <NavLink to='/'>{formatMessage(messages.navHome)}</NavLink>
          <NavLink to='/editor'>{formatMessage(messages.navEditor)}</NavLink>
        </nav>
      </header>
      <main className='app-main'>
        <Outlet />
      </main>
    </div>
  );
}
