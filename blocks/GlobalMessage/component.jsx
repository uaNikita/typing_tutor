import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './global-message.module.styl';


class GlobalMessage extends Component {
  state = {
    entered: false
  };

  componentWillReceiveProps() {
    const {
      props: {
        close,
      }
    } = this;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      close();
    }, 5500);
  }

  handleEntered = () => {
    this.setState({
      entered: true,
    });
  };

  handleExited = () => {
    this.setState({
      entered: false,
    });
  };

  handleClose = e => {
    e.preventDefault();

    this.props.close();
  };

  render() {
    const {
      props: {
        message,
      },
      state: {
        entered,
      }
    } = this;

    let rootClassName = classNames('root', {
      entered,
    });

    console.log('rootClassName', rootClassName);

    return (
      <TransitionGroup>
        {message ? <CSSTransition
          key={message}
          onEntered={this.handleEntered}
          onExited={this.handleExited}
          classNames={{
            enter: styles['animation-enter'],
            enterActive: styles['animation-enter_active'],
            exit: styles['animation-exit'],
            exitActive: styles['animation-exit_active'],
          }}
          timeout={500}>
          <div styleName={rootClassName}>
            <div styleName="content">
              <i styleName="icon" className="fa fa-bullhorn" />
              {message}
              <a href="" onClick={this.handleClose} className="fa fa-times" styleName="close" />
            </div>
            <div styleName="progress" />
          </div>
        </CSSTransition> : null}
      </TransitionGroup>
    );
  }
}

export default CSSModules(GlobalMessage, styles, {
  allowMultiple: true,
});
