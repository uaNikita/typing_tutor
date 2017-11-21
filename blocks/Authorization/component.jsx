import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login/container';
import Registration from './Registration/container';
import RestoreAccess from './RestoreAccess/container';

import './auth.styl';

const Authorization = ({ location, match: { url } }) => (
  <Switch location={location}>
    <Route path={`${url}/login`} component={Login} />
    <Route path={`${url}/registration`} component={Registration} />
    <Route path={`${url}/restore-access`} component={RestoreAccess} />
  </Switch>
);

export default Authorization;
