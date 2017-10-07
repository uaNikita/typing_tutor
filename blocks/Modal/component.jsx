import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './modal.styl';

const appearTimeout = 150;
const leaveTimeout = 150;

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
      close = <a href="" className="modal__close fa fa-times" onClick={this.onCloseHandler} />;
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
      <div className="modal">
        {overlay}
        <div className="modal__content">
          {close}
          {children}
        </div>
      </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default Modal;
