import React from 'react';
import CSSModules from 'react-css-modules';

import ContentToType from 'Blocks/ContentToType/component';
import ContentArea from '../ContentArea';

import styles from './learning-area.module.styl';

class Block extends ContentArea {
  componentDidMount = () => {
    const {
      props: {
        updateCharToType,
      },
    } = this;
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);

    updateCharToType();
  };

  componentWillUnmount() {
    const {
      props: {
        zeroingStatic,
      },
    } = this;

    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandler);

    zeroingStatic();
  }

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
        lesson,
        hiddenChars,
      },
    } = this;

    let typed = null;

    if (lesson.typed.length) {
      typed = (
        <span styleName="typed">
          <ContentToType hidden={hiddenChars}>
            {lesson.typed}
          </ContentToType>
        </span>
      );
    }

    return (
      <div styleName="learningarea">
        {typed}
        <span styleName="cursor" />
        <ContentToType hidden={hiddenChars}>
          {lesson.rest}
        </ContentToType>
      </div>
    );
  }
}

export default CSSModules(Block, styles);
