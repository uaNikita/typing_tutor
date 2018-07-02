import React from 'react';
import CSSModules from 'react-css-modules';

import createAsyncField from './createAsyncField';

import Name from './Name/container';
import Bio from './Bio/container';

import styles from './profile.module.styl';

let Aaa = createAsyncField({
  key: 'name',
  label: 'Name',
  type: 'text',
});

const Block = () => (
  <div styleName="profile">
    {createAsyncField({
      key: 'name',
      label: 'Name',
      type: 'text',
    })}
    <Name />
    <Bio />
  </div>
);

export default CSSModules(Block, styles);
