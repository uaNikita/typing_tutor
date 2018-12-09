import React from 'react';
import { withRouter, Link, Route } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import NavLink from 'Blocks/NavLink';
import Logo from 'Blocks/Logo/component';
import UserMenu from './UserMenu/container';

import styles from './header.module.styl';

const Block = ({ location: { pathname } }) => (
  <div styleName="root">
    <div styleName="left">
      {pathname === '/'
        ? <Logo />
        : <Link styleName="home" className="far fa-keyboard" to="/" />}

      <nav styleName="items">
        <span styleName="modes-title">I type</span>

        <NavLink styleName="item" activeClassName={styles.item_selected} to="/mode/syllable">Syllable</NavLink>
        <NavLink styleName="item" activeClassName={styles.item_selected} to="/mode/text">Text</NavLink>
      </nav>
    </div>

    <div styleName="right">
      <NavLink styleName="item" activeClassName={styles.item_selected} to="/options">Options</NavLink>

      <NavLink styleName="item" activeClassName={styles.item_selected} to="/statistic">Statistic</NavLink>

      <Route path="/" component={UserMenu} />
    </div>
  </div>
);

export default withRouter(CSSModules(Block, styles, {
  allowMultiple: true,
}));
