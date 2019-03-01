import React from 'react';

import SignIn from './SignIn/component';
import PersonalMenu from './PersonalMenu/container';

const Block = ({ refreshToken }) => (
  refreshToken
    ? <PersonalMenu />
    : <SignIn />
);

export default Block;
