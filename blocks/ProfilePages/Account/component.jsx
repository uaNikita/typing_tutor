import React from 'react';

import ChangePassword from './ChangePassword/container';
import DeleteAccount from './DeleteAccount/component.jsx';

const Account = () => ([
  <ChangePassword key="change-password" />,
  <DeleteAccount key="delete-account" />,
]);

export default Account;
