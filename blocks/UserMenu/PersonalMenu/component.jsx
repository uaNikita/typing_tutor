import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { personal } from 'Constants/navigation';

import CSSModules from 'react-css-modules';

import styles from './personal-menu.module.styl';

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
  }

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

    return (
      <div className="drop-down" styleName="menu">
        <button className="drop-down__button" styleName="button">
          <span styleName="avatar" onClick={this.handleUserMenu}>{nickname[0]}</span>
        </button>

        {menuOpened && <nav className="drop-down__dd">{links}</nav>}
      </div>
    );
  }
}

export default withRouter(CSSModules(Block, styles));