import React, {Component} from 'react'
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

    if (!modalName) {
      return <div></div>;
    }

    let content = '';

    if (['Login', 'ForgotPassword', 'Registration'].indexOf(modalName) + 1) {
      content = <Authorization />
    }

    return (
      <Modal className="container" closable={closable}>
        {content}
      </Modal>
    )
  }
}

export default ModalFrame