import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CSSModules from 'react-css-modules';

import styles from './personal-menu.module.styl';

const personal = [
  {
    pathname: '/settings',
    text: 'Settings',
  },
  {
    pathname: '/authorization/sign-out',
    text: 'Sign out',
  },
];

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

  closeIfNeeded = (e) => {
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
        menuOpened: false,
      });
    }
  };

  handleUserMenu = () => {
    const {
      state: {
        menuOpened,
      },
    } = this;

    this.setState({
      menuOpened: !menuOpened,
    });
  };

  render() {
    const {
      props: {
        location,
        email,
        name,
      },
      state: {
        menuOpened,
      },
    } = this;

    const nickname = name || email;
    
    const links = personal.map(({ pathname, text }) => {
      const re = new RegExp(`^${pathname}`);

      const linkProps = {
        key: pathname,
        styleName: 'item',
      };

      return re.test(location.pathname)
        ? (
          <span {...linkProps}>
            {text}
          </span>
        )
        : (
          <Link {...linkProps} to={pathname}>
            {text}
          </Link>
        );
    });

    return (
      <div className="drop-down" styleName="menu">
        <button
          type="button"
          className="drop-down__button"
          styleName="button"
          onClick={this.handleUserMenu}
        >
          <span styleName="avatar">
            {nickname[0]}
          </span>
        </button>

        {menuOpened && (
          <nav className="drop-down__dd">
            {links}
          </nav>
        )}
      </div>
    );
  }
}

export default CSSModules(Block, styles);
