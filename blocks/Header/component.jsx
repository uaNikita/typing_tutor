import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import { modes, other } from 'Constants/navigation';

import UserMenu from 'Blocks/UserMenu/container';

import styles from './header.module.styl';

class Header extends Component {
  generateLinks = data => {
    const {
      props: {
        location,
      },
    } = this;

    return data.map(link => {
      const {
        pathname,
        state,
        text,
      } = link;

      const re = new RegExp(`^${pathname}`);

      return re.test(location.pathname) ?
        <span key={pathname} styleName="item item_selected">{text}</span>
        :
        <Link key={pathname} styleName="item" to={{ pathname, state }}>{text}</Link>;
    });
  }

  render() {
    return (
      <div styleName="root">
        <Link styleName="home" className="fa fa-keyboard-o" to="/" />

        <div styleName="actions">
          <nav styleName="items">
            <span styleName="modes-title">Modes:</span>
            {this.generateLinks(modes)} | {this.generateLinks(other)}
          </nav>

          <UserMenu />
        </div>
      </div>
    );
  }
}

export default withRouter(CSSModules(Header, styles, {
  allowMultiple: true,
}));
