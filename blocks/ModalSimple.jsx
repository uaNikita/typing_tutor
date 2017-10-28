import React from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Modal from 'Blocks/Modal/component.jsx';

const ModalSimple = ({ active, onClose, children }) => (
  <TransitionGroup>
    {active ? <CSSTransition
      classNames="modal"
      timeout={250}>
      <Modal onClose={onClose}>{children}</Modal>
    </CSSTransition> : null}
  </TransitionGroup>
);

export default ModalSimple;
