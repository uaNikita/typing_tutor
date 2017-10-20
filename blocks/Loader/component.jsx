import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './loader.module.styl';

const Loader = ({ className, size }) => {
  let style;

  if (size) {
    const s = parseInt(size, 10);

    style = {
      width: s,
      height: s,
      borderWidth: s / 10,
    };
  }

  return (
    <span className={className} styleName="root">
      <span styleName="loader" style={style} />
    </span>
  );
};

export default CSSModules(Loader, styles);
