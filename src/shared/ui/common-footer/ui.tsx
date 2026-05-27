import {useIntl} from 'react-intl';

import {messages} from './messages.js';

export function CommonFooter() {
  const {formatMessage} = useIntl();

  return <footer className='common-footer'>{formatMessage(messages.rightsNotice)}</footer>;
}
