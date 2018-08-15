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

        if (char === ' ') {
          const key = i;

          if (hidden) {
            c = (
              <Fragment key={key}>
                <span styleName="middot">
                  &middot;
                </span>
                <span styleName="separator" />
              </Fragment>
            );
          }
          else {
            c = <span styleName="space" />;
          }
        }
        else if (hidden && encodeURIComponent(char) === '%0A') {
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
