import React from 'react';
import { Switch, Redirect, Route, NavLink } from 'react-router-dom';

import Keyboard from './Keyboard/container';

const menuLinks = [
  {
    url: '/keyboard',
    text: 'Keyboard layout',
  },
];

const Block = ({ match: { url } }) => {
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
          <Redirect exact from={url} to={`${url}/keyboard`} />
          <Route path={`${url}/keyboard`} component={Keyboard} />
        </Switch>
      </div>
    </div>
  );
};

export default Block;
