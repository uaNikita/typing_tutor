import React, { Fragment } from 'react';

import Header from 'Blocks/Header/component';
import Keypad from './Keypad/container';
import SyllableArea from './SyllableArea/container';
import TextArea from './TextArea/container';
import Actions from './Actions/container';

const Block = ({ mode }) => {
  let area;

  switch (mode) {
    case 'text':
      area = <TextArea />;
      break;

    case 'syllable':
      area = <SyllableArea />;
      break;

    default:
  }

  return (
    <Fragment>
      <Header />
      <Actions />
      {area}
      <Keypad />
    </Fragment>
  );
};

export default Block;
