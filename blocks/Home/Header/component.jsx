import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import { modes, other } from 'Constants/navigation';

import Logo from 'Blocks/Logo/component.jsx';
import UserMenu from 'Blocks/UserMenu/container';
import Metronome from '../Metronome/container';

import styles from './home-header.module.styl';

class Block extends Component {
  state = {
    navOpen: false,
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
      this.setState({ navOpen: false });
    }
  };

  hanldeClickMenu = () => {
    const {
      state: {
        navOpen,
      },
    } = this;

    this.setState({
      navOpen: !navOpen,
    });
  };

  render() {
    const {
      props: {
        location,
      },
      state: {
        navOpen,
      },
    } = this;

    const modesLinks = modes.map(link => {
      const {
        pathname,
        state,
        text,
      } = link;

      const re = new RegExp(`^${pathname}`);

      const itemProps = {
        key: pathname,
        styleName: 'item item_modes',
      };

      return re.test(location.pathname)
        ? (
          <span {...itemProps}>
            {text}
          </span>
        )
        : (
          <Link {...itemProps} to={{ pathname, state }}>
            {text}
          </Link>
        );
    });

    const otherLinks = other.map(link => {
      const {
        pathname,
        state,
        text,
      } = link;

      const re = new RegExp(`^${pathname}`);

      const itemProps = {
        key: pathname,
        styleName: 'item',
      };

      return re.test(location.pathname)
        ? (
          <span {...itemProps}>
            {text}
          </span>
        )
        : (
          <Link {...itemProps} to={{ pathname, state }}>
            {text}
          </Link>
        );
    });

    return (
      <header styleName="root">
        <Logo />

        <div styleName="actions">
          <Metronome />

          <div className="drop-down" styleName="menu">
            <button
              type="button"
              className="fa fa-bars drop-down__button"
              styleName="button"
              onClick={this.hanldeClickMenu} />

            {navOpen && (
              <nav className="drop-down__dd">
                <h4 styleName="modes-title">
                  Modes
                </h4>
                {modesLinks}
                {otherLinks}
              </nav>
            )}
          </div>

          <UserMenu />
        </div>
      </header>
    );
  }
}

export default withRouter(CSSModules(Block, styles, {
  allowMultiple: true,
}));
