import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import Menu from 'Blocks/Menu.jsx';
import AuthInfo from 'Blocks/AuthInfo/container';

import styles from './header.module.styl';

const Header = () => (
  <nav styleName="nav">
    <Link styleName="home" className="fa fa-keyboard-o" to="/" />

    <div styleName="items">
      <Menu className={styles.item} activeClassName={styles.item_selected} />

      <AuthInfo />
    </div>
  </nav>
);

export default CSSModules(Header, styles);
