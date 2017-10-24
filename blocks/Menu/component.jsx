import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './menu.module.styl';

const Menu = () => (
  <nav styleName="menu__nav">
    <div styleName="menu__nav-in">
      <Link styleName="menu__home" className="fa fa-keyboard-o" to="/" />
      <NavLink styleName="menu__nav-item" activeClassName="settings__nav-item--selected" to="/learning-mode">
        Learning mode
      </NavLink>
      <NavLink styleName="menu__nav-item" activeClassName="settings__nav-item--selected" to="/text-mode">
        Text mode
      </NavLink>
      <NavLink styleName="menu__nav-item" activeClassName="settings__nav-item--selected" to="/keyboard">
        Keyboard Layout
      </NavLink>
      <NavLink styleName="menu__nav-item" activeClassName="settings__nav-item--selected" to="/profile">
        My profile
      </NavLink>
    </div>
  </nav>
);

export default CSSModules(Menu, styles);
