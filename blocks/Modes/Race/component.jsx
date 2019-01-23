import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  NavLink,
} from 'react-router-dom';

import FastRace from './FastRace/container';
import WaitingToStart from './WaitingToStart/container';

const menuLinks = [
  {
    url: '/fast-race',
    text: 'Fast race',
  },
  {
    url: '/waiting-to-start',
    text: 'Waiting to start',
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
          <Redirect exact from={url} to={`${url}/fast-race`} />
          <Route path={`${url}/fast-race`} component={FastRace} />
          <Route path={`${url}/waiting-to-start`} component={WaitingToStart} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </div>
  );
};

export default Block;
