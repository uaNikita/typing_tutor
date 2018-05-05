import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import Menu from 'Blocks/Menu/container';
import AuthInfo from 'Blocks/AuthInfo/container';
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
      if (el && el.matches(`.${styles.items}, .${styles.button}`)) {
        break;
      }

      el = el.parentElement;
    }

    if (!el) {
      this.setState({ navOpen: false });
    }
  };

  hanldeClickMenu = () => {
    this.setState({
      navOpen: !this.state.navOpen,
    });
  };

  render() {
    const {
      state: {
        navOpen,
      },
    } = this;

    return (
      <header styleName="root">
        <div styleName={classNames('menu', { menu_expanded: navOpen })}>
          <button className="fa fa-bars" styleName="button" onClick={this.hanldeClickMenu} />

          <nav styleName="nav">
            <Menu className={styles.item} />
          </nav>
        </div>

        <div styleName="actions">
          <Metronome />

          <AuthInfo />
        </div>
      </header>
    );
  }
}

export default CSSModules(Home, styles, {
  allowMultiple: true,
});
