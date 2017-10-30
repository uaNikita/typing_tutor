import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CSSModules from 'react-css-modules';

import styles from './global-message.module.styl';


class GlobalMessage extends Component {
  componentWillReceiveProps() {
    const {
      props: {
        close,
      }
    } = this;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      close();
    }, 5000);
  }

  handleEntered = () => {
    console.log('handleEntered');
  }

  handleClose = e => {
    e.preventDefault();

    this.props.close();
  }

  render() {
    const {
      props: {
        message,
        close,
      }
    } = this;

    return (
      <TransitionGroup>
        {message ? <CSSTransition
          key={message}
          onEntered={this.handleEntered}
          classNames={{
            enter: styles['animation-enter'],
            enterActive: styles['animation-enter_active'],
            exit: styles['animation-exit'],
            exitActive: styles['animation-exit_active'],
          }}
          timeout={500}>
          <div styleName="root">
            <div styleName="content">
              <i styleName="icon" className="fa fa-bullhorn" />
              {message}
              <a href="" onClick={this.handleClose} className="fa fa-times" styleName="close" />
            </div>
          </div>
        </CSSTransition> : null}
      </TransitionGroup>
    );
  }
}

export default CSSModules(GlobalMessage, styles);
