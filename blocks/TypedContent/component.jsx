import React, { Fragment } from 'react';
import CSSModules from 'react-css-modules';

import styles from './typed-content.module.styl';

const Block = ({ children, hidden }) => {
  let result = children;

  if (result) {
    result = result
      .split('')
      .map((char, i) => {
        let c = char;

        if (hidden && char === ' ') {
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

          c = hidden
            ? (
              <Fragment>
                <span key={key} styleName="enter">
                  ↵
                </span>
                <br />
              </Fragment>
            )
            : <br key={key} />;
        }

        return c;
      });
  }

  return (
    <Fragment>
      {result}
    </Fragment>
  );
};

export default CSSModules(Block, styles);
