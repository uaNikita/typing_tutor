import React from 'react';
import { Route, Link } from 'react-router-dom';
import _ from 'lodash';

const routes = {
  '/': 'Home',
  '/settings': 'Settings',
  '/settings/a': 'A',
  '/settings/a/b': 'B',
};

const getPaths = (pathname) => {
  const paths = [];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev, curr) => {
    const currPath = `${prev}/${curr}`;

    paths.push(currPath);

    return currPath;
  });

  return paths;
};

const BreadcrumbsItem = ({ ...rest, match }) => {
  const {
    isExact,
    url,
  } = match;

  console.log('match', match);

  let breadcrumbText = routes[url];

  if (!breadcrumbText) {
    breadcrumbText = _.last(url.split('/'));
  }

  return (
    isExact
      ? <span active>{breadcrumbText}</span>
      : (
        <Link to={url}>{breadcrumbText}</Link>
      )
  );

  return null;
};

const Breadcrumbs = ({ ...rest, location: { pathname } }) => {
  const paths = getPaths(pathname);

  return paths.map(path => <Route key={path} path={path} component={BreadcrumbsItem} />);
};

export default Breadcrumbs;
