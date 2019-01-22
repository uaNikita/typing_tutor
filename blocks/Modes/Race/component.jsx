import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  NavLink,
} from 'react-router-dom';

import CurrentRace from './CurrentRace/container';

const menuLinks = [
  {
    url: '/current-race',
    text: 'Current race',
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
          <Redirect exact from={url} to={`${url}/current-race`} />
          <Route path={`${url}/current-race`} component={CurrentRace} />
        </Switch>
      </div>
    </div>
  );
};

export default Block;
