import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './modal.styl';

class Modal extends Component {
  onCloseHandler = e => {
    e.preventDefault();

    const {
      history: {
        replace,
      },
      lastNoModalLocation,
    } = this.props;

    replace(lastNoModalLocation.pathname);
  };

  render() {
    const { children } = this.props;

    return (
      <div className="modal">
        <div className="modal__overlay" onClick={this.onCloseHandler} />
        <div className="modal__content">
          <a href="" className="modal__close fa fa-times" onClick={this.onCloseHandler} />
          {children}
        </div>
      </div>
    );
  }
}

export default withRouter(Modal);
