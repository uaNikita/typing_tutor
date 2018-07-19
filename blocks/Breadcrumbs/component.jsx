import React, { Fragment } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import styles from './breadcrumbs.module.styl';

const routes = {
  '/': 'Home',
};

const Block = (props) => {
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
              {' / '}
            </Fragment>
          )
      ));

      list = (
        <nav styleName="root">
          {list}
        </nav>
      );
    }
  }

  return list;
};

export default CSSModules(Block, styles);
