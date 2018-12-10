import React from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import PureString from 'Blocks/PureString';
import ContentArea from '../ContentArea';

import styles from './syllable-area.module.styl';

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

  render() {
    const {
      props: {
        lesson: {
          typed,
          rest,
        },
        hiddenChars,
      },
    } = this;

    const className = classNames(
      'hidden-characters',
      {
        'hidden-characters_show': hiddenChars,
      },
    );

    return (
      <div className={className} styleName="area">
        <PureString
          styleName="typed"
          string={typed}
          hiddenChars
        />
        <span styleName="cursor" />
        <PureString
          string={rest}
          hiddenChars
        />
      </div>
    );
  }
}

export default CSSModules(Block, styles);
