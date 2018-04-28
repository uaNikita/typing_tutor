import React, { Fragment } from 'react';

import ChangePassword from './ChangePassword/container';
import DeleteAccount from './DeleteAccount/component.jsx';

const Account = () => (
  <Fragment>
    <ChangePassword />
    <DeleteAccount />
  </Fragment>
);

export default Account;
