import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Modal from '../Modal/container';
import Login from '../authorization/Login/container';
import Registration from '../authorization/Registration/container';
import ForgotPassword from '../authorization/ForgotPassword/component.jsx';

const ModalFrame = props => {
  const { modalName, closable } = props;
  const appearTimeout = 150;
  const leaveTimeout = 150;
  let modal;

  if (modalName) {
    let content;

    switch (modalName) {
      case 'Login':
        content = <Login />;
        break;

      case 'Registration':
        content = <Registration />;
        break;

      case 'ForgotPassword':
        content = <ForgotPassword />;
        break;
    }

    modal = (
      <Modal className="container" closable={closable}>
        {content}
      </Modal>
    );
  }

  return (
    <ReactCSSTransitionGroup
      component="div"
      className="modal__frame"
      transitionName="modal"
      transitionEnterTimeout={appearTimeout}
      transitionAppearTimeout={appearTimeout}
      transitionLeaveTimeout={leaveTimeout}
      transitionAppear={true}>
      {modal}
    </ReactCSSTransitionGroup>
  );
};

export default ModalFrame;
