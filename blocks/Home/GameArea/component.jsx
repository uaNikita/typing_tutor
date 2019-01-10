import React, { Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';


import { keyboards, languages } from 'Constants/languages';

import PureString from 'Blocks/PureString';
import ContentArea from '../ContentArea';

import styles from './game-area.module.styl';

class Block extends ContentArea {
  area = React.createRef();

  state = {
    words: [],
    result: undefined,
    wordToType: {
      typed: '',
      last: '',
    }
  };

  constructor(props) {
    super(props);

    const { language } = _.find(keyboards, { name: props.keyboard });
    const { nouns } = _.find(languages, { name: language });

    this.nouns = _.cloneDeep(nouns);
  }

  areaWidth = 900;

  step = 20;

  slots = 6;

  wordHeight = 26;

  score = 0;

  start = () => {
    const go = () => {
      this.setState(({ words, result }) => {
        const state = {};

        if (_.isUndefined(result)) {
          state.words = words.map(word => {
            word.left -= this.step;

            if (word.left <= 0) {
              state.result = false;
            }

            return word;
          });

          if (_.isUndefined(state.result)) {
            setTimeout(go, 200);
          }
        }

        return state;
      });
    };

    go();
  };

  getFreeRandomSlot = () => {
    const words = this.area.current.querySelectorAll(`.${styles.word}`);

    const slots = _.range(0, this.slots);

    if (words) {
      Array.from(words).map(word => {
        const extremeRightEdge = word.offsetLeft + word.offsetWidth + this.step;

        if (extremeRightEdge > this.areaWidth) {
          const occupiedLine = word.offsetTop / this.wordHeight;

          _.pull(slots, occupiedLine);
        }
      });
    }

    return _.sample(slots);
  };

  addWord = () => {
    const allWords = Object.keys(this.nouns);
    const index = _.random(0, allWords.length - 1);
    const word = allWords[index];

    delete this.nouns[word];

    this.setState(({ words }) => {
      words.push({
        top: this.getFreeRandomSlot() * this.wordHeight,
        left: this.areaWidth,
        word,
      });

      const state = {
        words,
      };

      if (words.length === 1) {
        state.wordToType = {
          typed: '',
          last: word,
        };
      }

      return state;
    });
  };

  keyPressHandlerModified = (...rest) => {
    const char = this.keyPressHandler(...rest);

    console.log('char', char);
  };


  componentDidMount = () => {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandlerModified);

    this.start();

    setInterval(this.addWord, 5000);
  };

  componentWillUnmount() {
    const {
      props: {
        zeroingStatic,
      },
    } = this;

    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandlerModified);

    zeroingStatic();
  }

  render() {
    const {
      state: {
        words,
        result,
        wordToType,
      },
    } = this;

    let message;

    if (_.isBoolean(result)) {
      if (result) {
        message = <p styleName="message message_good">You win</p>;
      }
      else {
        message = <p styleName="message message_bad">Game over</p>;
      }
    }

    return (
      <Fragment>

        <div styleName="level">
          Easy
          <div styleName="level-line">
            <div styleName="level-pointer" style={{
              width: '0%',
            }} />
          </div>
          Hard
        </div>

        {message}

        <p styleName="area" ref={this.area}>
          {words.map(({ top, left, word }) => (
              <span
                key={word}
                style={{ top, left }}
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
            string={wordToType.typed}
            hiddenChars
          />
          <span className="cursor" />
          <PureString
            string={wordToType.last}
            hiddenChars
          />
        </p>
      </Fragment>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
