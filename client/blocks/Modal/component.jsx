import React, { Component } from 'react';

import './modal.styl';

class Modal extends Component {
  onCloseHandler = e => {
    e.preventDefault();

    this.props.closeModal();
  };

  render() {
    const { closable, children } = this.props;
    let overlay = <div className="modal__overlay" />;
    let close = '';

    if (closable) {
      overlay = <div className="modal__overlay" onClick={this.onCloseHandler} />;
      close = <a href className="modal__close fa fa-times" onClick={this.onCloseHandler} />;
    }

    return (
      <div className="modal">
        {overlay}
        <div className="modal__content">
          {close}
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;
