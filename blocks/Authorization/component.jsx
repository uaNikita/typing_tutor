import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Modal from 'Blocks/Modal/container';
import Login from './Login/container';
import Registration from './Registration/container';
import RestoreAccess from './RestoreAccess/container';

import './auth.styl';

const Authorization = ({ match: { url } }) => (
  <Switch>
    <Modal>
      <Route path={`${url}/login`} component={Login} />
      <Route path={`${url}/registration`} component={Registration} />
      <Route path={`${url}/restore-access`} component={RestoreAccess} />
    </Modal>
  </Switch>
);

export default withRouter(Authorization);
