import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login/container';
import Registration from './Registration/container';
import ForgotPassword from './ForgotPassword/container';

const Authorization = () => (
  <Switch>
    <Route path={'/login'} component={Login} />
    <Route path={'/registration'} component={Registration} />
    <Route path={'/forgot-password'} component={ForgotPassword} />
  </Switch>
);

export default Authorization;
