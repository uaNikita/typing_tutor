import React, { Fragment } from 'react';
import CSSModules from 'react-css-modules';

import styles from './content.module.styl';

const Block = ({ string }) => {
  let result = string;

  // if (true) {
  result = result
    .split('')
    .map((char, i) => {
      let c = char;

      if (char === ' ') {
        const key = i;

        c = (
          <span key={key} styleName="space">
            ␣
          </span>
        );
      }
      else if (encodeURIComponent(char) === '%0A') {
        const key = i;

        c = (
          <span key={key} styleName="enter">
            ↵
            {char}
          </span>
        );
      }

      return c;
    });
  // }

  return (
    <Fragment>
      {result}
    </Fragment>
  );
};

export default CSSModules(Block, styles);
