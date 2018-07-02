import React from 'react';
import CSSModules from 'react-css-modules';

import createAsyncField from './createAsyncField';

import styles from './profile.module.styl';

const Block = () => (
  <div styleName="profile">
    {createAsyncField({
      key: 'name',
    })}
    {createAsyncField({
      key: 'bio',
      type: 'textarea',
    })}
  </div>
);

export default CSSModules(Block, styles);
