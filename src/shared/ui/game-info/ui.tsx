import {Button} from 'antd';
import {useIntl} from 'react-intl';

import type {GameInfoProps} from './types.js';

import {messages} from './messages.js';

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
