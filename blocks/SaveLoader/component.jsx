import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CSSModules from 'react-css-modules';

import styles from './save-loader.module.styl';

const Block = () => (
  <TransitionGroup component={null}>
    {modal && (
      <CSSTransition
        classNames="modal"
        timeout={250}
        mountOnEnter
        unmountOnExit>
        <span className="root">
          <span styleName="loader" />
          <span styleName="check-mark" />
        </span>
      </CSSTransition>
    )}
  </TransitionGroup>
);

export default CSSModules(Block, styles);
