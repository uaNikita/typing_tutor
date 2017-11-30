import React from 'react';
import { NavLink } from 'react-router-dom';
import nav from '../utils/nav';

const modes = [
  {
    pathname: '/learning-mode',
    text: 'learning',
  },
  {
    pathname: '/text-mode',
    text: 'text',
  },
];

const other = [
  {
    pathname: '/settings',
    text: 'Settings',
  },
];

const personal = [
  {
    pathname: '/profile',
    text: 'My profile',
  },
  {
    pathname: '/sign-out',
    state: { modal: true },
    text: 'Sign out',
  },
];

const Menu = ({ className, activeClassName, email }) => {
  const getNavLinks = links => links.map(({ pathname, state, text }) => (
    <NavLink
      key={pathname}
      className={className}
      activeClassName={activeClassName}
      to={{
        pathname,
        state,
      }}>
      {text}
    </NavLink>
  ));

  return [
    <nav key="modes" className="menu__modes">Modes:{getNavLinks(modes)}</nav>,
    <nav key="other" className="menu__other">{getNavLinks(other)}</nav>,
    email ? <nav key="personal" className="menu__personal">{getNavLinks(personal)}</nav> : null,
  ];
};

export default Menu;
