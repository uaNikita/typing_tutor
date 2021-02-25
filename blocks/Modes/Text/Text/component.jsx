import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import Loader from 'Blocks/Loader/component';
import View from './View/container';
import Edit from './Edit/container';

import styles from './text.module.styl';

const Block = props => {
  const {
    match: {
      url,
    },
    entities,
    text,
  } = props;

  let content = <Loader styleName="loader" size="30" />;

  if (entities) {
    if (text) {
      content = (
        <Switch>
          <Route
            exact
            path={url}
            render={routeProps => <View {...routeProps} {...text} />}
          />
          <Route
            exact
            path={`${url}/edit`}
            render={routeProps => <Edit {...routeProps} {...text} />}
          />
          <Redirect to="/404" />
        </Switch>
      );
    }
    else {
      content = <Redirect to="/404" />;
    }
  }

  return content;
};

export default CSSModules(Block, styles);
