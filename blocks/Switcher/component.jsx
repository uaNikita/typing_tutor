import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './switcher.module.styl';

const Switcher = input => {
  let title = 'Off';

  if (input.checked) {
    title = 'On';
  }

  return (
    <label styleName="switcher" title={title}>
      <input type="radio" {...input} />
      <span styleName="switcher__bg" />
      <span styleName="switcher__toggle" />
    </label>
  );
};

export default CSSModules(Switcher, styles);
