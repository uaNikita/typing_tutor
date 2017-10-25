import React from 'react';
import CSSModules from 'react-css-modules';
import { Switch, Route, NavLink } from 'react-router-dom';

import Profile from './Profile/container';
import Account from './Account/container';

import styles from './my-profile-pages.module.styl';

const menuLinks = [
  {
    url: '',
    text: 'Profile',
  },
  {
    url: '/account',
    text: 'Account',
  },
];

const MyProfilePages = ({ match: { url } }) => {
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
      {links}
      <div className="sub-layout__content">
        <Switch>
          <Route path={`${url}/account`} component={Account} />
          <Route path={url} exact component={Profile} />
        </Switch>
      </div>
    </div>
  );
};

export default CSSModules(MyProfilePages, styles);
