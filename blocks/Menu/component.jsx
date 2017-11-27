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
      {links.map(({ href, text, personal }) => {
        let navLink = <NavLink key={href} styleName="item" activeClassName={styles.item_selected} to={href}>{text}</NavLink>;

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
