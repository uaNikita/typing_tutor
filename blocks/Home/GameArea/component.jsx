import React from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';

import { keyboards, languages } from 'Constants/languages';

import PureString from 'Blocks/PureString';
import ContentArea from '../ContentArea';

import styles from './game-area.module.styl';

class Block extends ContentArea {
  state = {
    words: [],
  };

  constructor(props) {
    super(props);

    const { language } = _.find(keyboards, { name: props.keyboard });
    const { nouns } = _.find(languages, { name: language });

    this.nouns = _.cloneDeep(nouns);
  }

  areaWidth = 900;

  step = 20;

  start = () => {
    const go = () => {
      this.setState(({ words }) => ({
        words: words.map(w => ({
          ...w,
          x: w.x - this.step,
        })),
      }));

      setTimeout(go, 1000);
    };

    go();
  };

  addWord = () => {
    const index = _.random(0, this.nouns.length - 1);
    const word = this.nouns[index];
    this.nouns.splice(index, 1);

    this.setState(({ words }) => ({
      words: words.push({
        x: this.areaWidth,
        word,
      })
    }));
  };

  componentDidMount = () => {
    const {
      props: {
        updateCharToType,
      },
    } = this;
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);


    this.start();

    setInterval(this.addWord, 5000);


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
    const {
      state: {
        words,
      },
    } = this;

    return (
      <div styleName="root">
        <p styleName="area">
          {words.map(({ x, word }) => (
              <span
                key={word}
                style={{ top: 70, left: x }}
                styleName="word"
              >
                {word}
              </span>
            )
          )}
        </p>
        <p styleName="type-word">
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
