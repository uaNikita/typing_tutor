import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import styles from './not-found.module.styl';

const Block = () => (
  <section styleName="root">
    <h2 styleName="status">404</h2>

    <div styleName="text">
      <h1 styleName="title">Oops! Page not found</h1>
      <p>Incorrectly typed address, or such a page on the site no longer exists.</p>
      <p>Go back to <Link to="/">home</Link>.</p>
    </div>
  </section>
);

export default CSSModules(Block, styles);
