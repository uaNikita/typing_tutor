import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CSSModules from 'react-css-modules';

import styles from './save-loader.module.styl';

const Block = ({ show }) => (
  <TransitionGroup component={null}>
    {show && (
      <CSSTransition
        classNames={{
          enter: styles['root-enter'],
          enterActive: styles['root-enter-active'],
          exit: styles['root-exit'],
          exitActive: styles['root-exit-active'],
        }}
        timeout={{
          enter: 300,
          exit: 1300,
        }}
        mountOnEnter
        unmountOnExit
      >
        <span styleName="root">
          <span styleName="loader" />
          <span className="fa fa-check" styleName="check-mark" />
        </span>
      </CSSTransition>
    )}
  </TransitionGroup>
);

export default CSSModules(Block, styles);
