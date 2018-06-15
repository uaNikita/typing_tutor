import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import SignIn from 'Blocks/Authorization/SignIn/container';

import styles from './sign-in.module.styl';

class Block extends Component {
  state = {
    menuOpened: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.closeIfNeeded);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeIfNeeded);
  }

  closeIfNeeded = e => {
    let el = e.target;

    // traverse parents
    while (el) {
      if (el && el.matches(`.${styles.root}`)) {
        break;
      }

      el = el.parentElement;
    }

    if (!el) {
      this.setState({ menuOpened: false });
    }
  };

  hanldeClickMenu = () => {
    const {
      state: {
        menuOpened,
      },
    } = this;

    this.setState({
      menuOpened: !menuOpened,
    });
  }

  render() {
    const {
      state: {
        menuOpened,
      },
    } = this;

    return (
      <div className="drop-down" styleName="root">
        <button
          className="fa fa-user-circle-o drop-down__button"
          styleName="button"
          onClick={this.hanldeClickMenu} />
        {menuOpened && <SignIn className="drop-down__dd" styleName="drop-down" />}
      </div>
    );
  }
}


export default CSSModules(Block, styles);
