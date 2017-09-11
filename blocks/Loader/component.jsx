import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './loader.module.styl';

const Loader = ({ className, size }) => {
  let style;

  if (size) {
    style = {
      width: size,
      height: size,
      marginTop: -(size / 2),
      marginLeft: -(size / 2),
      fontSize: size,
    };
  }

  return (
    <span className={className} styleName="root">
      <span styleName="loader" className="fa fa-spinner fa-spin" style={style} />
    </span>
  );
};

export default CSSModules(Loader, styles);
