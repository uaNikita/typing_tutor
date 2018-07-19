import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import View from './View/container';
import Edit from './Edit/container';

const TextMode = (props) => {
  const {
    match: {
      url,
    },
    text,
  } = props;

  return text
    ? (
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
    )
    : (
      <Redirect to="/404" />
    );
};

export default TextMode;
