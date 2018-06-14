import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import { personal } from 'Constants/navigation';

import CSSModules from 'react-css-modules';

import SignIn from './SignIn/container';

import styles from './user-menu.module.styl';

class Block extends Component {
  state = {
    signInOpened: false,
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
      this.setState({ userMenuOpened: false });
    }
  };

  handleSignIn = () => {
    const {
      state: {
        signInOpened,
      },
    } = this;

    this.setState({
      signInOpened: !signInOpened,
    });
  }

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
        signInOpened,
      },
    } = this;

    let content = (
      <div styleName="unauthorized">
        <button className="fa fa-user-circle-o" styleName="button" onClick={this.handleSignIn} />
        {signInOpened && <SignIn />}
      </div>
    );

    if (email) {
      const nickname = name || email;

      const styleName = classNames('menu', {
        menu_expanded: userMenuOpened,
      });

      const links = personal.map(link => {
        const {
          pathname,
          state,
          text,
        } = link;

        const re = new RegExp(`^${pathname}`);

        return re.test(location.pathname) ?
          <span key={pathname} styleName="item">{text}</span>
          :
          <Link key={pathname} styleName="item" to={{ pathname, state }}>{text}</Link>;
      });

      content = (
        <div styleName={styleName}>
          <button styleName="button">
            <span styleName="avatar" onClick={this.handleUserMenu}>{nickname[0]}</span>
          </button>

          <nav styleName="nav">{links}</nav>
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
