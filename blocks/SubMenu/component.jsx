import React from 'react';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './submenu.module.styl';

const SubMenu = ({ links }) => (
  <nav>
    {links.map(({ url, text }) => (
      <NavLink key={url} styleName="item" activeClassName={styles.item_selected} to={url}>{text}</NavLink>
    ))}
  </nav>
);

export default CSSModules(SubMenu, styles);
