import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CSSModules from 'react-css-modules';

import styles from './global-message.module.styl';

const GlobalMessage = ({ message }) => (
  <TransitionGroup>
    {message ? <CSSTransition
      classNames="modal"
      timeout={250}>
      <div styleName="root">
        {message}
      </div>
    </CSSTransition> : null}
  </TransitionGroup>
);

export default CSSModules(GlobalMessage, styles);
