import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import Menu from 'Blocks/Menu.jsx';
import AuthInfo from 'Blocks/AuthInfo/container';
import Metronome from '../Metronome/container';
import styles from './home-header.module.styl';

class Home extends Component {
  state = {
    navOpen: false,
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
        <div className="nav">
          <button className={`${styles.button} fa fa-bars`} onClick={this.hanldeClickMenu} />

          {navOpen ? (
            <nav styleName="items">
              <Menu />
            </nav>
          ) : null}
        </div>

        <div styleName="actions">
          <Metronome />

          <AuthInfo />
        </div>
      </header>
    );
  }
}

export default CSSModules(Home, styles);
