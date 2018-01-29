import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Modal from 'Blocks/Modal/component.jsx';

const ModalSimple = ({ active, onClose, children, className }) => (
  <TransitionGroup>
    {active ?
      <CSSTransition
        classNames="modal"
        timeout={250}>
        <Modal className={className} onClose={onClose}>{children}</Modal>
      </CSSTransition>
      : null}
  </TransitionGroup>
);

export default ModalSimple;
