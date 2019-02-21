import React, { Fragment } from 'react';
import {
  Switch,
  Route,
  Redirect,
  NavLink,
} from 'react-router-dom';
import CSSModules from 'react-css-modules';

import Fingers from './Fingers/container';
import Free from './Free/container';

import './syllable.styl';
import styles from './syllable-mode.module.styl';

const menuLinks = [
  {
    url: '/fingers',
    text: 'By fingers',
  },
  {
    url: '/free',
    text: 'Free',
  },
];

const Block = (props) => {
  const {
    match: {
      url,
    },
  } = props;

  const links = menuLinks.map(({ url: linkUrl, text }) => (
    <NavLink
      key={linkUrl}
      className="submenu-link"
      activeClassName="submenu-link_selected"
      to={url + linkUrl}
    >
      {text}
    </NavLink>
  ));

  return (
    <Fragment>
      <div styleName="modes">
        <div styleName="menu">
          <h4 styleName="title">
            Sets
          </h4>
          {links}
        </div>

        <div styleName="content">
          <Switch>
            <Redirect exact from={url} to={`${url}/fingers`} />
            <Route path={`${url}/fingers`} component={Fingers} />
            <Route path={`${url}/free`} component={Free} />
            <Redirect to="/404" />
          </Switch>
        </div>
      </div>
    </Fragment>
  );
};

export default CSSModules(Block, styles);
