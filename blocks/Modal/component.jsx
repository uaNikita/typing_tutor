import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './modal.styl';

const appearTimeout = 150;
const leaveTimeout = 150;

class Modal extends Component {
  onCloseHandler = e => {
    e.preventDefault();

    this.props.history.goBack();
  };

  render() {
    const { children } = this.props;

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
          <div className="modal__overlay" onClick={this.onCloseHandler} />
          <div className="modal__content">
            <a href="" className="modal__close fa fa-times" onClick={this.onCloseHandler} />
            {children}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withRouter(Modal);
