import React, {Component} from 'react'

class Modal extends Component {
  render() {
    const {
            closable,
            children
          } = this.props;
    let close = '';

    if (closable) {
      close = <a href className="modal__close fa fa-times" onClick={ this._onCloseHandler.bind(this) }></a>;
    }

    return (
      <div className="modal">
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