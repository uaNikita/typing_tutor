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

    let content = (
      <Fragment>
        <Link key="log-in" to={{ pathname: '/sign-in', state: { modal: true } }}>Log In</Link>
        \u00A0or\u00A0
        <Link key="sign-up" to={{ pathname: '/sign-up', state: { modal: true } }}>Sign Up</Link>
      </Fragment>
    );

    if (email) {
      const nickname = name || email;

      content = (
        <div>
          <button styleName="avatar" onClick={this.triggerMenu}>{nickname[0]}</button>

          <div>menu</div>
        </div>
      );
    }

    return <div styleName="auth-info">{content}</div>;
  }
}

export default CSSModules(AuthInfo, styles);
