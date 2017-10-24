import React from 'react';
import CSSModules from 'react-css-modules';
import { Route } from 'react-router-dom';

import SubMenu from 'Blocks/SubMenu/component.jsx';
import Profile from './Profile/container';
import Account from './Account/container';

import styles from './my-profile-pages.module.styl';

const menuItems = [
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

  const items = menuItems.map(link => ({
    ...link,
    url: url + link.url,
  }));

  console.log(111, items);

  return (
    <div className="sub-layout">
      <SubMenu items={items} />
      <div className="sub-layout__content">
        <Route path={url} component={Profile} />
        <Route path={`${url}/account`} component={Account} />
      </div>
    </div>
  );
};

export default CSSModules(MyProfilePages, styles);
