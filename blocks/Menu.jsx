import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import nav from 'Utils/nav';

const modes = [
  {
    pathname: '/modes/learning',
    text: 'learning',
  },
  {
    pathname: '/modes/text',
    text: 'text',
  },
];

const other = [
  {
    pathname: '/settings',
    text: 'Settings',
  },
];

const Menu = props => {
  const {
    location: {
      pathname: locationPathname,
    },
    className,
    activeClassName,
  } = props;

  const getNavLinks = links =>
    links.map(link => {
      const {
        pathname,
        state,
        text,
      } = link;

      const re = new RegExp(`^${pathname}`);
      let item;

      if (re.test(locationPathname)) {
        item = <span key={pathname} className={classNames(className, activeClassName)}>{text}</span>;
      }
      else {
        item = (
          <span key={pathname} className={className}>
            <Link to={{ pathname, state }}>{text}</Link>
          </span>
        );
      }

      return item;
    });

  return (
    <Fragment>
      <nav className="menu__modes">
        <span className="menu__modes-title">Modes:</span>
        {getNavLinks(modes)}
      </nav>
      <nav className="menu__other">{getNavLinks(other)}</nav>
    </Fragment>
  );
};

export default withRouter(Menu);
