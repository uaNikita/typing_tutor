import React from 'react';
import CSSModules from 'react-css-modules';

import ChangePassword from './ChangePassword/container';
import DeleteAccount from './DeleteAccount/container';

import styles from './account.module.styl';

const Account = () => [
  <ChangePassword />,
  <DeleteAccount />,
];

export default CSSModules(Account, styles);
