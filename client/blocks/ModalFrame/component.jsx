import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Modal from '../../containers/Modal.jsx';
import Login from '../authorization/Login/component.jsx';
import Registration from '../authorization/Registration/component.jsx';
import ForgotPassword from '../authorization/ForgotPassword/component.jsx';

class ModalFrame extends Component {
   render() {

      const { modalName, closable } = this.props;
      const appearTimeout = 150;
      const leaveTimeout = 150;
      let modal;

      console.log(modalName, closable);

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
   }
}

export default ModalFrame;