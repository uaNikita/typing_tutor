import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import Logo from 'Blocks/Logo/component';
import NavLink from 'Blocks/NavLink';
import UserMenu from './UserMenu/container';

import styles from './header.module.styl';

const Block = () => (
  <div styleName="root">
    <nav styleName="child">
      <Logo />

      <span styleName="modes-title">Modes</span>

      <NavLink styleName="item" activeClassName={styles.item_selected} to="/mode/syllable">Syllable</NavLink>
      <NavLink styleName="item" activeClassName={styles.item_selected} to="/mode/text">Text</NavLink>
    </nav>

    <div styleName="child">
      <NavLink styleName="item" activeClassName={styles.item_selected} to="/options">Options</NavLink>

      <NavLink styleName="item" activeClassName={styles.item_selected} to="/statistic">Statistic</NavLink>

      <Route path="/" component={UserMenu} />
    </div>
  </div>
);

export default withRouter(CSSModules(Block, styles, {
  allowMultiple: true,
}));
