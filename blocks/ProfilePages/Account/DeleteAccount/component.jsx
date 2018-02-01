import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import ModalSimple from 'Blocks/ModalSimple.jsx';
import DeleteAccountModal from './DeleteAccountModal/container';

import styles from './delete-account.module.styl';

class DeleteAccount extends Component {
  state = {
    modal: false,
  };

  handleClickButton = () => this.setState({ modal: true });

  handlerCloseModal = () => this.setState({ modal: false });

  render() {
    const {
      state: {
        modal,
      },
    } = this;

    return (
      <div>
        <h3 styleName="title">Delete Account</h3>

        <button className="button" styleName="button" onClick={this.handleClickButton}>Delete account</button>

        <ModalSimple active={modal} onClose={this.handlerCloseModal}>
          <DeleteAccountModal />
        </ModalSimple>
      </div>
    );
  }
}


export default CSSModules(DeleteAccount, styles);
