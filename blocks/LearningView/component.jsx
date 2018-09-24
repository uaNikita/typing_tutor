import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import styles from './learning-view.module.styl';

class Block extends Component {
  getCharsMarkup = string => string.split('').map((char, i) => {
    let c = char;

    if (char === ' ') {
      const key = char + i;

      c = (
        <span key={key} styleName="space">
          ␣
        </span>
      );
    }

    return c;
  });

  render() {
    const {
      props: {
        className,
        lesson,
      },
    } = this;

    return (
      <div className={className} styleName="learningarea">
        {this.getCharsMarkup(lesson)}
      </div>
    );
  }
}

export default CSSModules(Block, styles);
