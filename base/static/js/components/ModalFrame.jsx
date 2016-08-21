import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from '../containers/Modal.jsx';
import Authorization from '../containers/auth/Authorization.jsx';

/*
 List of modal windows:

 - Login
 - ForgotPassword
 - Registration
 */

class ModalFrame extends Component {
  render() {
    const {modalName, closable} = this.props;
    let appearTimeout = 150;
    let leaveTimeout = 150;
    var modal = '';

    if (modalName) {
      let content = '';

      if (['Login', 'ForgotPassword', 'Registration'].indexOf(modalName) + 1) {
        content = <Authorization />
      }

      modal = <Modal className="container" closable={closable}>
        {content}
      </Modal>;
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
    )
  }
}

export default ModalFrame