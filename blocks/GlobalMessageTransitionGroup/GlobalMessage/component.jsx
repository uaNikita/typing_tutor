import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import styles from './global-message.module.styl';

class GlobalMessage extends Component {
  closeTimeout = undefined;

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
          <i styleName="icon" className="fas fa-bullhorn" />
          {message}
          <button
            type="button"
            onClick={close}
            className="fas fa-times"
            styleName="close"
            aria-label="Close"
          />
        </div>
        <div styleName={classNames('progress', { entered })} />
      </div>
    );
  }
}

export default CSSModules(GlobalMessage, styles, {
  allowMultiple: true,
});
