import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './modal.styl';

class Modal extends Component {
  handlerClose = e => {
    e.preventDefault();

    this.props.onClose();
  };

  render() {
    const { children, onClose } = this.props;

    return (
      <div className="modal">
        <div className="modal__overlay" onClick={onClose} />
        <div className="modal__content">
          <a href="" className="modal__close fa fa-times" onClick={this.handlerClose} />
          {children}
        </div>
      </div>
    );
  }
}

export default withRouter(Modal);
