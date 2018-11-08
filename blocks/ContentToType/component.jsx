import React, { Fragment } from 'react';
import CSSModules from 'react-css-modules';

import styles from './typed-content.module.styl';

const Block = ({ children, hidden }) => {
  let result = children;

  if (result) {
    result = result
      .split('')
      .map((char, i) => {
        const key = i;
        const encodeChar = encodeURIComponent(char);
        let transformedChar = char;

        switch (encodeChar) {
          // space
          case '%20':
            transformedChar = <span key={key} styleName="space">&middot;</span>;

            break;

          // enter
          case '%0A':
            transformedChar = (
              <Fragment key={key}>
                <span styleName="enter">
                  ↵
                </span>
                <br />
              </Fragment>
            );

            break;

          default:
        }

        return transformedChar;
      });
  }

  return (
    <Fragment>
      {result}
    </Fragment>
  );
};

export default CSSModules(Block, styles);
