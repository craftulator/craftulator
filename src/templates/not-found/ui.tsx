import {useIntl} from 'react-intl';

import {messages} from './messages.js';

export function NotFoundTemplate() {
  const {formatMessage} = useIntl();

  return (
    <section className='page'>
      <h1>{formatMessage(messages.title)}</h1>
      <p>{formatMessage(messages.description)}</p>
    </section>
  );
}
