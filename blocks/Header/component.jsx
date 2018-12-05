import React, { Component } from 'react';
import { withRouter, Link, Route } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import { modes, other } from 'Constants/navigation';

import NavLink from 'Blocks/NavLink';
import Logo from 'Blocks/Logo/component';
import UserMenu from './UserMenu/container';

import styles from './header.module.styl';

class Block extends Component {
  generateLinks = (data) => {
    const {
      props: {
        location,
      },
    } = this;

    return data.map((link) => {
      const {
        pathname,
        text,
      } = link;


      return <NavLink styleName="item" activeClassName={styles.item_selected} to={pathname}>{text}</NavLink>
    });
  };

  render() {
    const {
      props: {
        location: {
          pathname,
        },
      },
    } = this;

    return (
      <div styleName="root">
        {pathname === '/'
          ? <Logo />
          : <Link styleName="home" className="far fa-keyboard" to="/" />}

        <div styleName="actions">
          <nav styleName="items">
            {/* todo: what can I do with menu wrap with some bg */}
            <span styleName="modes-title">Modes:</span>

            <NavLink styleName="item" activeClassName={styles.item_selected} to="/mode/learning">Learning</NavLink>
            <NavLink styleName="item" activeClassName={styles.item_selected} to="/mode/text">Text</NavLink>
            |
            <NavLink styleName="item" activeClassName={styles.item_selected} to="/options">Options</NavLink>

            ...................
            <NavLink styleName="item" activeClassName={styles.item_selected} to="/statistic">Statistic</NavLink>
          </nav>

          <Route path="/" component={UserMenu} />
        </div>
      </div>
    );
  }
}

export default withRouter(CSSModules(Block, styles, {
  allowMultiple: true,
}));
