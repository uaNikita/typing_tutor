import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  NavLink,
} from 'react-router-dom';

import FlyingWords from './FlyingWords/container';

const menuLinks = [
  {
    url: '/flying-words',
    text: 'Flying words',
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
          <Route path={`${url}/flying-words`} component={FlyingWords} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </div>
  );
};

export default Block;
