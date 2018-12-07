import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './logo.module.styl';

const Block = ({ location: { pathname } }) => {
  const props = {
    styleName: 'logo',
    className: 'far fa-keyboard',
  };

  return pathname === '/'
    ? <span {...props} />
    : <Link {...props} to="/" />;
};

export default withRouter(CSSModules(Block, styles));
