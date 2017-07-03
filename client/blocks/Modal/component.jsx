import React, {Component} from 'react'

import './modal.styl';

class Modal extends Component {
  render() {
    const {closable, children} = this.props;
    let overlay = <div className="modal__overlay"></div>;
    let close = '';

    if (closable) {
      overlay = <div className="modal__overlay" onClick={ this._onCloseHandler.bind(this) }></div>;
      close = <a href className="modal__close fa fa-times" onClick={ this._onCloseHandler.bind(this) }></a>;
    }

    return (
      <div className="modal">
        {overlay}
        <div className="modal__content">
          {close}
          {children}
        </div>
      </div>
    )
  }

  _onCloseHandler(e) {
    e.preventDefault();

    this.props.closeModal();
  }
}

export default Modal