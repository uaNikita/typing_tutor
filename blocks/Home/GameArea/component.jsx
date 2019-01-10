import React, { Fragment } from 'react';
import _ from 'lodash';
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
    },
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

  level = 1;

  move = () => {
    const {
      state: {
        words,
      },
    } = this;

    const state = {};

    state.words = words.map((word) => {
      const modifiedWord = { ...word };

      modifiedWord.left -= this.step;

      if (modifiedWord.left <= 0) {
        state.result = false;

        clearTimeout(this.timeouts.move);
        clearTimeout(this.timeouts.addWord);
      }

      return modifiedWord;
    });

    this.setState(state);
  }

  addWord = () => {
    const {
      state: {
        words,
      },
    } = this;

    const allWords = Object.keys(this.nouns);
    const index = _.random(0, allWords.length - 1);
    const word = allWords[index];

    delete this.nouns[word];

    words.push({
      top: this.getFreeRandomSlot() * this.wordHeight,
      left: this.areaWidth,
      word,
    });

    const state = {
      words,
    };

    // if it is first word we need add it for typing
    if (words.length === 1) {
      state.wordToType = {
        typed: '',
        last: word,
      };
    }

    this.setState(state);
  }

  start = () => {
    const timeout = 1000;

    this.timeouts = {};

    const move = () => {
      this.move();

      this.timeouts.move = setTimeout(move, timeout);
    };

    move();

    const addWord = () => {
      this.addWord();

      this.timeouts.addWord = setTimeout(addWord, timeout * 3);
    };

    addWord();
  };

  getFreeRandomSlot = () => {
    const words = this.area.current.querySelectorAll(`.${styles.word}`);

    const slots = _.range(0, this.slots);

    if (words) {
      Array.from(words).forEach((word) => {
        const extremeRightEdge = word.offsetLeft + word.offsetWidth + this.step;

        if (extremeRightEdge > this.areaWidth) {
          const occupiedLine = word.offsetTop / this.wordHeight;

          _.pull(slots, occupiedLine);
        }
      });
    }

    return _.sample(slots);
  };

  keyPressHandlerModified = (...rest) => {
    const {
      state: {
        words,
        wordToType: {
          typed,
          last,
        },
      },
    } = this;

    const char = this.keyPressHandler(...rest);

    if (char === last[0]) {
      const state = {
        wordToType: {
          typed: typed + last[0],
          last: last.substring(1),
        },
      };

      if (!state.wordToType.last.length) {
        if (words.length) {
          state.words = words;
          state.words.splice(0, 1);

          state.wordToType = {
            typed: '',
            last: state.words[0].word,
          };
        }
        else {
          state.wordToType = {
            typed: '',
            last: '',
          };
        }
      }

      this.setState(state);
    }
  };


  componentDidMount = () => {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandlerModified);

    this.start();
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
            <div styleName="level-pointer" style={{ width: '0%' }} />
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
          ))}
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
