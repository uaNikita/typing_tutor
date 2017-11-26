import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import links from 'Utils/nav';
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
        {email && <Metronome />}

        <button className="fa fa-bars" onClick={this.hanldeClickMenu} />

        {navOpen ? (
          <nav styleName="items">
            {links.map(({ href, text, forAuthorized }) => {
              let navLink = (
                <NavLink key={href} styleName="item" activeClassName={styles.item_selected} to={href}>{text}</NavLink>
              );

              if (forAuthorized && !email) {
                navLink = null;
              }

              return navLink;
            })}
          </nav>
        ) : null}
      </header>
    );
  }
}

export default CSSModules(Home, styles);
