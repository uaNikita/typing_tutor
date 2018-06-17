import React, { Component } from 'react';

import SignIn from './SignIn/container';
import PersonalMenu from './PersonalMenu/container';

class Block extends Component {
  render() {
    const {
      props: {
        email,
      },
    } = this;

    let content = <SignIn />;

    if (email) {
      content = <PersonalMenu />;
    }

    return content;
  }
}

export default Block;
