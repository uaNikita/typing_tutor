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
  let modal = null;

  if (modalName) {
    switch (modalName) {
      case 'Login':
        modal = <Login />;
        break;

      case 'Registration':
        modal = <Registration />;
        break;

      case 'ForgotPassword':
        modal = <ForgotPassword />;
        break;
    }

    if (modal) {
      modal = (
        <ReactCSSTransitionGroup
          component="div"
          className="modal__frame"
          transitionName="modal"
          transitionEnterTimeout={appearTimeout}
          transitionAppearTimeout={appearTimeout}
          transitionLeaveTimeout={leaveTimeout}
          transitionAppear={true}>
          <Modal className="container" closable={closable}>
            {modal}
          </Modal>
        </ReactCSSTransitionGroup>
      );
    }
  }

  return modal;
};

export default ModalFrame;
