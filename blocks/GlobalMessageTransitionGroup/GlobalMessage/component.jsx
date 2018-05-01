import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './global-message.module.styl';

class GlobalMessage extends Component {
  state = {
    entered: false,
  };

  componentDidMount() {
    const {
      props: {
        close,
      },
    } = this;

    setTimeout(() => this.setState({ entered: true }), 200);

    clearTimeout(this.closeTimeout);

    this.closeTimeout = setTimeout(close, 5300);
  }

  closeTimeout = undefined;

  render() {
    const {
      props: {
        message,
        close,
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
          <button onClick={close} className="fa fa-times" styleName="close" />
        </div>
        <div styleName={classNames('progress', { entered })} />
      </div>
    );
  }
}

export default CSSModules(GlobalMessage, styles, {
  allowMultiple: true,
});
