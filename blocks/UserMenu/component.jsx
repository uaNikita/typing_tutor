import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import { personal } from 'Utils/menu';

import CSSModules from 'react-css-modules';

import styles from './user-menu.module.styl';

class Block extends Component {
  state = {
    openedMenu: false,
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
      this.setState({ openedMenu: false });
    }
  };

  triggerMenu = () =>
    this.setState({
      openedMenu: !this.state.openedMenu,
    });

  render() {
    const {
      props: {
        location,
        email,
        name,
      },
      state: {
        openedMenu,
      },
    } = this;

    let content = (
      <div styleName="unauthorized">
        <Link to={{ pathname: '/sign-in', state: { modal: true } }}>Log In</Link>
        &nbsp;or&nbsp;
        <Link to={{ pathname: '/sign-up', state: { modal: true } }}>Sign Up</Link>
      </div>
    );

    if (email) {
      const nickname = name || email;

      const styleName = classNames('menu', {
        menu_expanded: openedMenu,
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
            <span styleName="avatar" onClick={this.triggerMenu}>{nickname[0]}</span>
          </button>

          <nav styleName="nav">{links}</nav>
        </div>
      );
    }

    return content;
  }
}

export default withRouter(CSSModules(Block, styles, {
  allowMultiple: true,
}));
