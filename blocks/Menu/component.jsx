import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './menu.module.styl';

const Menu = () => (
  <nav styleName="settings__nav">
    <div styleName="settings__nav-in">
      <Link styleName="settings__home fa fa-keyboard-o" to="/" />
      <NavLink styleName="settings__nav-item" activeClassName="settings__nav-item--selected" to="/settings/learning-mode">
        Learning mode
      </NavLink>
      <NavLink styleName="settings__nav-item" activeClassName="settings__nav-item--selected" to="/settings/text-mode">
        Text mode
      </NavLink>
      <NavLink styleName="settings__nav-item" activeClassName="settings__nav-item--selected" to="/settings/keyboard">
        Keyboard Layout
      </NavLink>
      <NavLink styleName="settings__nav-item" activeClassName="settings__nav-item--selected" to="/my-profile">
        My profile
      </NavLink>
    </div>
  </nav>
);

export default CSSModules(Menu, styles);
