import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const routes = {
  '/': 'Home',
};

const Breadcrumbs = (props) => {
  const {
    location: {
      pathname,
    },
    start,
  } = props;

  let list = null;

  if (pathname !== '/') {
    list = [];

    pathname.split('/').reduce((prev, curr) => {
      const path = `${prev}/${curr}`;

      let text = routes[path];

      if (!text) {
        text = _.capitalize(_.lowerCase(curr));
      }

      list.push({
        path,
        text,
        name: curr,
      });

      return path;
    });

    if (start) {
      list = _.dropWhile(list, ({ name }) => name !== start);
    }

    if (list.length === 1) {
      list = null;
    }
    else {
      const lastIndex = list.length - 1;

      list = list.map(({ path, text }, i) => (
        lastIndex === i
          ? (
            <span key={path}>
              {text}
            </span>
          )
          : (
            <Fragment key={path}>
              <Link to={path}>
                {text}
              </Link>
              {' > '}
            </Fragment>
          )
      ));
    }
  }

  return list;
};

export default Breadcrumbs;
