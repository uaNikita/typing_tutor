import React, { Fragment } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';

import { keyboards, languages } from 'Constants/languages';

import PureString from 'Blocks/PureString';
import ContentArea from '../ContentArea';

import styles from './game-area.module.styl';

const maxLevel = 20;

const levelsLimits = [3];

for (let i = 1; i < maxLevel; i += 1) {
  levelsLimits.push(Math.round(levelsLimits[i - 1] * 1.2));
}

class Block extends ContentArea {
  area = React.createRef();

  areaWidth = 900;

  step = 20;

  slots = 6;

  wordHeight = 26;

  timeout = 1000;

  maxLevel = maxLevel;

  levelsLimits = levelsLimits;

  state = {
    words: [],
    result: undefined,
    wordToType: {
      typed: '',
      last: '',
    },
    level: 1,
    levelLimit: levelsLimits[0],
    score: 0,
  };

  constructor(props) {
    super(props);

    const { language } = _.find(keyboards, { name: props.keyboard });
    const { nouns } = _.find(languages, { name: language });

    this.nouns = _.cloneDeep(nouns);
  }

  addListeners = () => {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandlerModified);
  }

  removeListeners = () => {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandlerModified);
  }

  getTimeout = () => {
    const {
      state: {
        level,
      },
    } = this;

    const min = 1600;
    const max = 300;

    const d = (min - max) / maxLevel;

    const move = min - level * d;

    return {
      move,
      addWord: move * 3,
    };
  }

  move = () => {
    const {
      state: {
        words,
      },
    } = this;

    this.timeouts.move = setTimeout(
      this.move,
      this.getTimeout().move,
    );

    const state = {};

    state.words = words.map((word) => {
      const modifiedWord = { ...word };

      modifiedWord.left -= this.step;

      if (modifiedWord.left <= 0) {
        this.finish(false);
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

    this.timeouts.addWord = setTimeout(
      this.addWord,
      this.getTimeout().addWord,
    );

    const allWords = Object.keys(this.nouns);
    const index = _.random(0, allWords.length - 1);
    const word = allWords[index];

    delete this.nouns[word];

    words.push({
      top: this.getFreeRandomSlot() * this.wordHeight,
      left: this.areaWidth - this.step,
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
    this.addListeners();

    this.timeouts = {};

    this.move();

    this.addWord();
  };

  finish = (result) => {
    this.removeListeners();

    clearTimeout(this.timeouts.move);
    clearTimeout(this.timeouts.addWord);

    this.setState({
      result,
    });
  }

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
        score,
        level,
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

      state.score = score + 1;

      if (state.score >= this.levelsLimits[level - 1]) {
        if (state.score >= this.levelsLimits[this.maxLevel - 1]) {
          this.finish(true);
        }
        else {
          state.level = level + 1;
          state.levelLimit = this.levelsLimits[level];
        }
      }

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

  componentWillUnmount = () => (
    this.removeListeners()
  );


  render() {
    const {
      state: {
        words,
        result,
        wordToType,
        score,
        level,
        levelLimit,
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
          Level: {level}/{this.maxLevel}
          <div styleName="level-line">
            <div styleName="level-pointer" style={{ width: '0%' }} />
          </div>
          {score}/{levelLimit}
        </div>

        {message}

        <p styleName="area" ref={this.area}>
          {
            this.timeouts
              ? words.map(({ top, left, word }) => (
                <span
                  key={word}
                  style={{ top, left }}
                  styleName="word"
                >
                  {word}
                </span>
              ))
              : <button type="button" className="button" styleName="start" onClick={this.start}>Start</button>
          }
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
