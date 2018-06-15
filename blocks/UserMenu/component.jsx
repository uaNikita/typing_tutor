import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { personal } from 'Constants/navigation';

import CSSModules from 'react-css-modules';

import SignIn from './SignIn/container';

import styles from './user-menu.module.styl';

class Block extends Component {
  state = {
    userMenuOpened: false,
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
      if (el && el.matches(`.${styles.menu}`)) {
        break;
      }

      el = el.parentElement;
    }

    if (!el) {
      this.setState({
        userMenuOpened: false,
      });
    }
  };

  handleUserMenu = () => {
    const {
      state: {
        userMenuOpened,
      },
    } = this;

    this.setState({
      userMenuOpened: !userMenuOpened,
    });
  }

  render() {
    const {
      props: {
        location,
        email,
        name,
      },
      state: {
        userMenuOpened,
      },
    } = this;

    let content = <SignIn />;

    if (email) {
      const nickname = name || email;

      const links = personal.map(link => {
        const {
          pathname,
          state,
          text,
        } = link;

        const re = new RegExp(`^${pathname}`);

        return re.test(location.pathname) ?
          <span key={pathname} styleName="item">{text}</span> :
          <Link key={pathname} styleName="item" to={{ pathname, state }}>{text}</Link>;
      });

      content = (
        <div styleName="menu">
          <button styleName="button">
            <span styleName="avatar" onClick={this.handleUserMenu}>{nickname[0]}</span>
          </button>

          {userMenuOpened && <nav styleName="nav">{links}</nav>}
        </div>
      );
    }

    return content;
  }
}

export default withRouter(
  CSSModules(Block, styles, {
    allowMultiple: true,
  }),
);
