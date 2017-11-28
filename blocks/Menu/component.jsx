import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import AuthInfo from 'Blocks/AuthInfo/container';
import links from 'Utils/nav';

import styles from './menu.module.styl';

const Menu = ({ email }) => (
  <nav styleName="nav">
    <Link styleName="home" className="fa fa-keyboard-o" to="/" />

    <div styleName="items">
      {links.map(({ pathname, state, text, personal }) => {
        let navLink = (
          <NavLink
            key={pathname}
            styleName="item"
            activeClassName={styles.item_selected}
            to={{
              pathname,
              state,
            }}>
            {text}
          </NavLink>
        );

        if (personal && !email) {
          navLink = null;
        }

        return navLink;
      })}

      <AuthInfo />
    </div>
  </nav>
);

export default CSSModules(Menu, styles);
