import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './global-message.module.styl';

let closeTimeout;


class GlobalMessage extends Component {
  state = {
    entered: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        entered: true,
      });
    }, 200);

    clearTimeout(closeTimeout);

    closeTimeout = setTimeout(() => {
      this.props.close();
    }, 5300);
  }

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
      },
    } = this;

    return (
      <div styleName="root">
        <div styleName={classNames('content', { entered })}>
          <i styleName="icon" className="fa fa-bullhorn" />
          {message}
          <a href="" onClick={this.handleClose} className="fa fa-times" styleName="close" />
        </div>
        <div styleName={classNames('progress', { entered })} />
      </div>
    );
  }
}

export default CSSModules(GlobalMessage, styles, {
  allowMultiple: true,
});
