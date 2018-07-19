import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import View from './View/container';
import Edit from './Edit/container';

const TextMode = ({ match: { url } }) => (
  <Switch>
    <Route exact path={url} component={View} />
    <Route exact path={`${url}/edit`} component={Edit} />
    <Redirect to="/404" />
  </Switch>
);

export default TextMode;
