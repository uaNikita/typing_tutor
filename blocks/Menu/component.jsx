import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import nav from 'Utils/nav';

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

const Menu = props => {
  const {
    location: {
      pathname: locationPathname,
    },
    className,
    activeClassName,
    email,
  } = props;

  const getNavLinks = links => links.map(link => {
    const {
      pathname,
      state,
      text,
    } = link;

    const re = new RegExp(`^${pathname}`);
    let item;

    if (re.test(locationPathname)) {
      item = <span key={pathname} className={activeClassName}>{text}</span>;
    }
    else {
      item = (
        <Link
          key={pathname}
          className={className}
          to={{
            pathname,
            state,
          }}>
          {text}
        </Link>
      );
    }

    return item;
  });

  return [
    <nav key="modes" className="menu__modes">Modes:{getNavLinks(modes)}</nav>,
    <nav key="other" className="menu__other">{getNavLinks(other)}</nav>,
    email ? <nav key="personal" className="menu__personal">{getNavLinks(personal)}</nav> : null,
  ];
};

export default Menu;
