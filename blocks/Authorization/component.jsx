import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Login from './Login/container';
import Registration from './Registration/container';
import ForgotPassword from './ForgotPassword/container';

const Authorization = ({ match: { url } }) => (
  <Switch>
    <Route path={`${url}/login`} component={Login} />
    <Route path={`${url}/registration`} component={Registration} />
    <Route path={`${url}/forgot-password`} component={ForgotPassword} />
  </Switch>
);

export default withRouter(Authorization);
