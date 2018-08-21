import React, { Fragment } from 'react';

import Keypad from './Keypad/container';
import LearningArea from './LearningArea/container';
import TextArea from './TextArea/container';
import Header from './Header/container';

const Block = ({ mode }) => {
  let area;

  switch (mode) {
    case 'text':
      area = <TextArea />;
      break;

    case 'learning':
      area = <LearningArea />;
      break;

    default:
  }

  return (
    <Fragment>
      <Header />
      {area}
      <Keypad />
    </Fragment>
  );
};

export default Block;
