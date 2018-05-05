import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './user-menu.module.styl';

class AuthInfo extends Component {
  state = {
    openedMenu: false,
  };

  triggerMenu = () => {
    this.setState({
      openedMenu: !this.state.openedMenu,
    });
  };

  render() {
    const {
      props: {
        email,
        name,
      },
      state: {
        openedMenu,
      },
    } = this;

    let content = [
      <Link key="log-in" to={{ pathname: '/sign-in', state: { modal: true } }}>Log In</Link>,
      '\u00A0or\u00A0',
      <Link key="sign-up" to={{ pathname: '/sign-up', state: { modal: true } }}>Sign Up</Link>,
    ];

    if (email) {
      const nickname = name || email;

      content = (
        <Fragment>
          <button styleName="avatar" onClick={this.triggerMenu}>{nickname[0]}</button>
          {openedMenu && (
            <div>menu</div>
          )}
        </Fragment>
      );
    }

    return <div styleName="auth-info">{content}</div>;
  }
}

export default CSSModules(AuthInfo, styles);
