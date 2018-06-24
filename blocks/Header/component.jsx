import React, { Component } from 'react';
import { withRouter, Link, Route } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import { modes, other } from 'Constants/navigation';

import UserMenu from 'Blocks/UserMenu/container';

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

      const re = new RegExp(`^${pathname}`);

      return re.test(location.pathname) ? (
        <span key={pathname} styleName="item item_selected">
          {text}
        </span>
      ) : (
        <span styleName="item" key={pathname}>
          <Link to={pathname}>
            {text}
          </Link>
        </span>
      );
    });
  }

  render() {
    return (
      <div styleName="root">
        <Link styleName="home" className="fa fa-keyboard-o" to="/" />

        <div styleName="actions">
          <nav styleName="items">
            <span styleName="modes-title">
Modes:
            </span>
            {this.generateLinks(modes)}
            {' '}
|
            {this.generateLinks(other)}
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
