import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import Logo from 'Blocks/Logo/component.jsx';
import Menu from 'Blocks/Menu.jsx';
import UserMenu from 'Blocks/UserMenu/container';
import Metronome from '../Metronome/container';
import styles from './home-header.module.styl';

class Home extends Component {
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
      state: {
        navOpen,
      },
    } = this;

    const menuStyleName = classNames('menu', {
      menu_expanded: navOpen,
    });

    return (
      <header styleName="root">
        <Logo />

        <div styleName="actions">
          <Metronome />

          <div styleName={menuStyleName}>
            <button className="fa fa-bars" styleName="button" onClick={this.hanldeClickMenu} />

            <nav styleName="nav">
              <Menu className={styles.item} />
            </nav>
          </div>

          <UserMenu />
        </div>
      </header>
    );
  }
}

export default CSSModules(Home, styles, {
  allowMultiple: true,
});
