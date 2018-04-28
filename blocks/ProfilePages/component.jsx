import React, { Fragment } from 'react';
import { Switch, Redirect, Route, NavLink } from 'react-router-dom';

import Account from './Account/component.jsx';

const menuLinks = [
  {
    url: '/account',
    text: 'Account',
  },
];

const SettingsPages = ({ match: { url } }) => {
  const links = menuLinks.map(({ url: linkUrl, text }) => (
    <NavLink
      key={linkUrl}
      className="submenu-link"
      activeClassName="submenu-link_selected"
      to={url + linkUrl}>
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
          <Redirect exact from={url} to={`${url}/account`} />
          <Route path={`${url}/account`} component={Account} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </div>
  );
};

export default SettingsPages;
