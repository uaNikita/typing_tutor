import React, { Component } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';

import styles from './learning-view.module.styl';

class Block extends Component {
  getCharsMarkup = string => string.split('').map((char, i) => {
    let c = char;

    if (char === ' ') {
      const key = char + i;

      c = <span key={key} styleName="space">␣</span>;
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

    let content;

    if (_.isString(lesson)) {
      content = this.getCharsMarkup(lesson);
    }
    else {
      let typed = null;

      if (lesson.typed.length) {
        typed = <span key="typed" styleName="typed">{this.getCharsMarkup(lesson.typed)}</span>;
      }

      content = [
        typed,
        <span key="cursor" styleName="cursor" />,
        this.getCharsMarkup(lesson.rest),
      ];
    }

    return <div className={className} styleName="learningarea">{content}</div>;
  }
}

export default CSSModules(Block, styles);
