import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import GlobalMessage from './GlobalMessage/container';
import styles from './global-message-transition-group.module.styl';

const GlobalMessageTransitionGroup = ({ message }) => (
  <TransitionGroup>
    {message ? <CSSTransition
      key={message}
      classNames={{
        enter: styles['animation-enter'],
        enterActive: styles['animation-enter_active'],
        exit: styles['animation-exit'],
        exitActive: styles['animation-exit_active'],
      }}
      timeout={{
        enter: 500,
        exit: 300,
      }}>
      <GlobalMessage />
    </CSSTransition> : null}
  </TransitionGroup>
);

export default GlobalMessageTransitionGroup;
