import React from 'react';
import CSSModules from 'react-css-modules';

import createAsyncField from './createAsyncField';

import styles from './profile.module.styl';

const fields = [
  {
    key: 'name',
  },
  {
    key: 'bio',
    type: 'textarea',
  },
];

const Block = () => (
  <div styleName="profile">
    {fields.map(o => createAsyncField(o))}
  </div>
);

export default CSSModules(Block, styles);
