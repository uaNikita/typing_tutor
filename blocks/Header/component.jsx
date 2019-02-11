import React from 'react';
import { withRouter, Route } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import _ from 'lodash';

import Logo from 'Blocks/Logo/component';
import NavLink from 'Blocks/NavLink';
import UserMenu from './UserMenu/container';

import styles from './header.module.styl';

const modesNavigation = [
  'Syllable',
  'Text',
  'Game',
  'Races',
];

const Block = ({ location: { pathname }, mode }) => {
  const modes = modesNavigation.map((item) => {
    const props = {
      key: item,
      styleName: 'item',
      activeClassName: styles.item_selected,
      to: `/mode/${_.kebabCase(item)}`,
    };

    // only for home page
    if (pathname === '/' && mode === item) {
      props.styleName = classNames(props.styleName, 'item_active');
    }

    return (
      <NavLink {...props}>
        {item}
      </NavLink>
    );
  });

  return (
    <div styleName="root">
      <nav styleName="child">
        <Logo />

        <span styleName="modes-title">Modes</span>

        {modes}
      </nav>

      <div styleName="child">
        <NavLink styleName="item" activeClassName={styles.item_selected} to="/options">Options</NavLink>
        <NavLink styleName="item" activeClassName={styles.item_selected} to="/statistic">Statistic</NavLink>

        <Route path="/" component={UserMenu} />
      </div>
    </div>
  );
};

export default withRouter(CSSModules(Block, styles, {
  allowMultiple: true,
}));
