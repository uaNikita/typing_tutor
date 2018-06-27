import React from 'react';
import CSSModules from 'react-css-modules';

import Name from './Name/container';
import Bio from './Bio/container';

import styles from './profile.module.styl';

const Block = () => (
  <div styleName="profile">
    <Name />
    <Bio />
  </div>
);

export default CSSModules(Block, styles);
