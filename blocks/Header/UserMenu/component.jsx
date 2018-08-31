import React from 'react';

import SignIn from './SignIn/container';
import PersonalMenu from './PersonalMenu/container';

const Block = ({ email }) => (
  email ? <PersonalMenu /> : <SignIn />
);

export default Block;
