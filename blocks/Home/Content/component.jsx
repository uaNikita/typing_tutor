import React, { Fragment } from 'react';
import CSSModules from 'react-css-modules';

import styles from './content.module.styl';

const Block = ({ children }) => {
  let result = children;

  result = result
    .split('')
    .map((char, i) => {
      let c = char;

      if (char === ' ') {
        const key = i;

        c = (
          <Fragment key={key}>
            <span styleName="space">
              ␣
            </span>
            <span styleName="real-space">
              {' '}
            </span>
          </Fragment>
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

  return (
    <Fragment>
      {result}
    </Fragment>
  );
};

export default CSSModules(Block, styles);
