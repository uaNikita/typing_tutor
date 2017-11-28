import SignIn from './SignIn/container';
import SignUp from './SignUp/container';
import RestoreAccess from './RestoreAccess/container';
import SignOut from './SignOut/container';

import './auth.styl';

export default [
  {
    path: '/sign-in',
    component: SignIn,
  },
  {
    path: '/sign-up',
    component: SignUp,
  },
  {
    path: '/restore-access',
    component: RestoreAccess,
  },
  {
    nonCloseable: true,
    path: '/sign-out',
    component: SignOut,
  },
];
