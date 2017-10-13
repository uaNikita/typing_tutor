import React from 'react';
import { Route } from 'react-router-dom';

import Modal from 'Blocks/Modal/container';
import Login from './Login/container';
import Registration from './Registration/container';
import ForgotPassword from './ForgotPassword/container';

const Authorization = ({ match: { url } }) => (
  <Modal>
    <Route path={`${url}/login`} component={Login} />
    <Route path={`${url}/registration`} component={Registration} />
    <Route path={`${url}/forgot-password`} component={ForgotPassword} />
  </Modal>
);

export default Authorization;
