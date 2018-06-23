import React from 'react';
import {
  Switch,
  Redirect,
  Route,
  Link,
} from 'react-router-dom';

import Profile from './Profile/component.jsx';
import Account from './Account/component.jsx';

const menuLinks = [
  {
    pathname: '/profile',
    text: 'Profile',
  },
  {
    pathname: '/account',
    text: 'Account',
  },
];

const Block = ({ location, match: { url } }) => {
  const links = menuLinks.map(({ pathname, text }) => {
    const re = new RegExp(`^${url}${pathname}$`);

    const linkProps = {
      key: pathname,
    };

    return re.test(location.pathname)
      ? (
        <span {...linkProps} className="submenu-link submenu-link_selected">
          {text}
        </span>
      )
      : (
        <Link {...linkProps} className="submenu-link" to={`${url}${pathname}`}>
          {text}
        </Link>
      );
  });

  return (
    <div className="sub-layout">
      <nav className="sub-layout__menu">
        {links}
      </nav>
      <div className="sub-layout__content">
        <Switch>
          <Redirect exact from={url} to={`${url}/profile`} />
          <Route path={`${url}/profile`} component={Profile} />
          <Route path={`${url}/account`} component={Account} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </div>
  );
};

export default Block;
