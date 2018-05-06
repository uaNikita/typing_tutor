import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './logo.module.styl';

const Block = () => (
  <Link to="/" styleName="logo">TouchToType</Link>
);

export default withRouter(CSSModules(Block, styles));
