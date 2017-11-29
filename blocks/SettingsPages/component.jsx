import React from 'react';
import CSSModules from 'react-css-modules';
import { Switch, Redirect, Route, NavLink } from 'react-router-dom';

import Keyboard from './Keyboard/container';

import styles from './my-profile-pages.module.styl';

const menuLinks = [
  {
    url: '/keyboard',
    text: 'Keyboard layout',
  },
];

const SettingsPages = ({ match: { url } }) => {
  const links = menuLinks.map(({ url: linkUrl, text }) => (
    <NavLink
      key={linkUrl}
      className="submenu-link"
      activeClassName="submenu-link_selected"
      to={url + linkUrl}
      exact>
      {text}
    </NavLink>
  ));

  return (
    <div className="sub-layout">
      <nav className="sub-layout__menu">
        {links}
      </nav>
      <div className="sub-layout__content">
        <Switch>
          <Redirect exact from={url} to={`${url}/keyboard`} />
          <Route path={`${url}/keyboard`} component={Keyboard} />
        </Switch>
      </div>
    </div>
  );
};

export default CSSModules(SettingsPages, styles);
