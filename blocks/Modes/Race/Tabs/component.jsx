import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  NavLink,
} from 'react-router-dom';
import _ from 'lodash';

import QuickStart from './QuickStart/container';
import Laps from './Laps/container';

const menuLinks = [
  'Quick start',
  'Laps',
];

const Block = ({ match: { url } }) => {
  const links = menuLinks.map(item => (
    <NavLink
      key={item}
      className="submenu-link"
      activeClassName="submenu-link_selected"
      to={`${url}/${_.kebabCase(item)}`}
    >
      {item}
    </NavLink>
  ));

  return (
    <div className="sub-layout">
      <nav className="sub-layout__menu">
        {links}
      </nav>
      <div className="sub-layout__content">
        <Switch>
          <Redirect exact from={url} to={`${url}/quick-start`} />
          <Route path={`${url}/quick-start`} component={QuickStart} />
          <Route path={`${url}/laps`} component={Laps} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </div>
  );
};

export default Block;
