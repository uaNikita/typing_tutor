import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Modal from 'Blocks/Modal/component.jsx';
import DeleteAccountModal from './DeleteAccountModal/container';

import styles from './delete-account.module.styl';

class DeleteAccount extends Component {
  state = {
    modal: false,
  };

  handleClickButton = () => (
    this.setState({
      modal: true,
    })
  );

  handlerCloseModal = () => (
    this.setState({
      modal: false,
    })
  );

  render() {
    const {
      state: {
        modal,
      },
    } = this;

    return (
      <div>
        <h3 styleName="title">
          Delete Account
        </h3>

        <button
          type="button"
          className="button"
          styleName="button"
          onClick={this.handleClickButton}
        >
          Delete account
        </button>

        <TransitionGroup component={null}>
          {modal && (
            <CSSTransition
              classNames="modal"
              timeout={250}
              mountOnEnter
              unmountOnExit
            >
              <Modal onClose={this.handlerCloseModal}>
                <DeleteAccountModal />
              </Modal>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }
}


export default CSSModules(DeleteAccount, styles);
