import React from 'react';
import CSSModules from 'react-css-modules';

import PureString from 'Blocks/PureString';
import ContentArea from '../ContentArea';

import styles from './game-area.module.styl';

class Block extends ContentArea {
  getWords = () => {

  }

  componentDidMount = () => {
    const {
      props: {
        updateCharToType,
      },
    } = this;
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);

    // updateCharToType();
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
    return (
      <div styleName="root">
        <p styleName="area">
          <span styleName="moving-word">knowledge</span>
        </p>
        <p styleName="word">
          <PureString
            styleName="typed"
            string="kno"
            hiddenChars
          />
          <span className="cursor" />
          <PureString
            string="wledge"
            hiddenChars
          />
        </p>
      </div>
    );
  }
}

export default CSSModules(Block, styles);
