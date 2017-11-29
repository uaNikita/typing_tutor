import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import links from 'Utils/nav';
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
      props: {
        email,
      },
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
              {links.map(({ pathname, state, text, personal }) => {
                let navLink = (
                  <Link
                    key={pathname}
                    styleName="item"
                    to={{
                      pathname,
                      state,
                    }}>
                    {text}
                  </Link>
                );

                if (personal && !email) {
                  navLink = null;
                }

                return navLink;
              })}
            </nav>
          ) : null}
        </div>

        <div styleName="actions">
          {email && <Metronome />}

          <AuthInfo />
        </div>
      </header>
    );
  }
}

export default CSSModules(Home, styles);
