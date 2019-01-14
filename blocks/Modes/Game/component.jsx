import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  NavLink,
} from 'react-router-dom';

import Game1 from './Game1/container';

const menuLinks = [
  {
    url: '/game1',
    text: 'Game 1',
  },
];

const Block = ({ match: { url } }) => {
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
    <div className="sub-layout">
      <nav className="sub-layout__menu">
        {links}
      </nav>
      <div className="sub-layout__content">
        <Switch>
          {/* change game name */}
          <Redirect exact from={url} to={`${url}/game1`} />
          <Route path={`${url}/game1`} component={Game1} />
        </Switch>
      </div>
    </div>
  );
};

export default Block;
