import React from 'react';

import ChangePassword from './ChangePassword/container';
import DeleteAccount from './DeleteAccount/container';

const Account = () => ([
  <ChangePassword key="change-password" />,
  <DeleteAccount key="delete-account" />,
]);

export default Account;
