import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Modal from 'Blocks/Modal/component.jsx';
import Login from './Login/container';
import Registration from './Registration/container';
import ForgotPassword from './ForgotPassword.jsx';

const Authorization = () => (
  <Modal>
    <Switch>
      <Route path={'/login'} component={Login} />
      <Route path={'/registration'} component={Registration} />
      <Route path={'/forgot-password'} component={ForgotPassword} />
    </Switch>
  </Modal>
);

export default Authorization;
