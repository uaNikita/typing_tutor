import React, { Fragment } from 'react';

export default string => (
  string
    .split('')
    .map((char, i) => {
      const key = i;
      const encodeChar = encodeURIComponent(char);
      let transformedChar = char;

      switch (encodeChar) {
        // space
        case '%20':
          transformedChar = <span key={key} className="space">&middot;</span>;

          break;

        // enter
        case '%0A':
          transformedChar = (
            <Fragment key={key}>
              <span className="enter">↵</span>
              <br />
            </Fragment>
          );

          break;

        default:
      }

      return transformedChar;
    })
);
