import React from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import PureString from 'Blocks/PureString';
import ContentArea from '../../ContentArea';
import Actions from '../../Actions/container';
import Keypad from '../../Keypad/container';

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
      <>
        <Actions />
        <div className={className} styleName="area">
          <PureString
            styleName="typed"
            string={typed}
            hiddenChars
          />
          <span className="cursor" />
          <PureString
            string={rest}
            hiddenChars
          />
        </div>
        <Keypad />
      </>
    );
  }
}

export default CSSModules(Block, styles);
