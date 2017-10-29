import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CSSModules from 'react-css-modules';

import styles from './global-message.module.styl';

import './global-message.styl';

const GlobalMessage = ({ message, close }) => (
  <TransitionGroup>
    {message ? <CSSTransition
      key={message}
      classNames="global-message"
      timeout={250}>
      <div styleName="root">
        <div styleName="content">
          <i styleName="icon" className="fa fa-bullhorn" />

          {message}

          <i onClick={close}>close</i>
        </div>
      </div>
    </CSSTransition> : null}
  </TransitionGroup>
);

export default CSSModules(GlobalMessage, styles);
