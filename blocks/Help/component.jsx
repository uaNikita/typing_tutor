import React, { Fragment } from 'react';
import CSSModules from 'react-css-modules';

import styles from './help.module.styl';

const Block = () => (
  /* eslint-disable react/jsx-one-expression-per-line */
  <Fragment>
    <h1 styleName="h1">Help</h1>
    <h2 styleName="h2">Modes</h2>

    <p><strong>Text</strong>. Text mode description
    </p>
    <p><strong>Learning</strong>. Applicaton has two differents submodes for learning mode:</p>
    <ul>
      <li>Fingers</li>
      <li>Free</li>
    </ul>
  </Fragment>
  /* eslint-enable react/jsx-one-expression-per-line */
);

export default CSSModules(Block, styles);
