import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import UserMenu from 'Blocks/UserMenu/container';

import styles from './menu.module.styl';

const links = [
  {
    href: '/learning-mode',
    text: 'Learning mode',
  },
  {
    href: '/text-mode',
    text: 'Text mode',
  },
  {
    href: '/settings',
    text: 'Settings',
  },
  {
    href: '/profile',
    text: 'My profile',
  },
];

const Menu = ({ email }) => (
  <nav styleName="nav">
    <Link styleName="home" className="fa fa-keyboard-o" to="/" />

    <div styleName="items">
      {links.map(({ href, text }) => (
        <NavLink key={href} styleName="item" activeClassName="item_selected" to={href}>{text}</NavLink>
      ))}

      {email && <NavLink key="/profile" styleName="item" activeClassName="item_selected" to="/profile">My profile</NavLink>}

      <UserMenu key="user-menu" />
    </div>
  </nav>
);

export default CSSModules(Menu, styles);
