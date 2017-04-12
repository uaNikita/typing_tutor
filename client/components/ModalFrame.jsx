import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Modal from '../containers/Modal.jsx';
import Login from './auth/Login.jsx';
import Registration from './auth/Registration.jsx';
import ForgotPassword from './auth/ForgotPassword.jsx';

class ModalFrame extends Component {
   render() {

      const { modalName, closable } = this.props;
      const appearTimeout = 150;
      const leaveTimeout = 150;
      let modal;

      if (modalName) {

         let content;

         switch (modalName) {

            case 'Login':
               content = <Login />;
               break;

            case 'ForgotPassword':
               content = <Registration />;
               break;

            case 'Registration':
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
   }
}

export default ModalFrame;