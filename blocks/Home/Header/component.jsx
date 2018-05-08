import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import { modes, other } from 'Utils/menu';

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

  hanldeClickMenu = () =>
    this.setState({ navOpen: !this.state.navOpen });

  render() {
    const {
      props: {
        location,
      },
      state: {
        navOpen,
      },
    } = this;

    const menuStyleName = classNames('menu', {
      menu_expanded: navOpen,
    });

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

      return re.test(location.pathname) ?
        <span {...itemProps}>{text}</span>
        :
        <Link {...itemProps} to={{ pathname, state }}>{text}</Link>;
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


      return re.test(location.pathname) ?
        <span {...itemProps}>{text}</span>
        :
        <Link {...itemProps} to={{ pathname, state }}>{text}</Link>;
    });

    return (
      <header styleName="root">
        <Logo />

        <div styleName="actions">
          <Metronome />

          <div styleName={menuStyleName}>
            <button className="fa fa-bars" styleName="button" onClick={this.hanldeClickMenu} />

            <nav styleName="nav">
              <h4 styleName="modes-title">Modes</h4>
              {modesLinks}
              {otherLinks}
            </nav>
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
