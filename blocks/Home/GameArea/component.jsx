import React, { Fragment } from 'react';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import dayjs from 'dayjs';

import { keyboards, languages } from 'Constants/languages';

import PureString from 'Blocks/PureString';
import ContentArea from '../ContentArea';

import styles from './game-area.module.styl';

const maxLevel = 20;

const levelsLimits = [3];
// const levelsLimits = [30];

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
    result: null,
    wordToType: {
      typed: null,
      last: null,
    },
    level: 1,
    levelLimit: levelsLimits[0],
    score: 0,
  };

  addListeners = () => {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandlerModified);
  };

  removeListeners = () => {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandlerModified);
  };

  getTimeout = () => {
    const {
      state: {
        level,
      },
    } = this;

    const min = 3600;
    const max = 400;

    const d = (min - max) / maxLevel;

    const move = min - level * d;

    return {
      move,
      addWord: move * 3,
    };
  };

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
  };

  addWord = () => {
    const {
      props: {
        setCharToType,
      },
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
        typed: null,
        last: word,
      };

      setCharToType(word[0]);
    }

    this.setState(state);
  };

  start = () => {
    const {
      props: {
        keyboard,
      },
    } = this;

    const { language } = _.find(keyboards, { name: keyboard });
    const { nouns } = _.find(languages, { name: language });

    this.nouns = _.cloneDeep(nouns);

    this.addListeners();

    this.timeouts = {};

    this.move();

    this.addWord();
  };

  restart = () => {
    this.setState({
      words: [],
      result: null,
      wordToType: {
        typed: null,
        last: null,
      },
      level: 1,
      levelLimit: levelsLimits[0],
      score: 0,
    });

    this.start();
  }

  finish = (result) => {
    this.removeListeners();

    clearTimeout(this.timeouts.move);
    clearTimeout(this.timeouts.addWord);

    this.setState({
      result,
    });
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

  keyPressHandlerModified = (...args) => {
    const {
      props: {
        setCharToType,
        sessionStart,
        addTouch,
        processAddStatistic,
      },
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

    if (last) {
      const char = this.keyPressHandler(...args);

      if (char === last[0]) {
        addTouch(true, last[0]);

        const state = {
          wordToType: {
            typed: (typed || '') + last[0],
            last: last.substring(1),
          },
        };

        if (!state.wordToType.last) {
          state.wordToType.last = null;
        }

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

        if (!state.wordToType.last) {
          state.wordToType = {
            typed: null,
            last: null,
          };

          if (words.length) {
            state.words = words;
            state.words.splice(0, 1);

            if (state.words.length) {
              state.wordToType.last = state.words[0].word;
            }
          }
        }

        const charToType = state.wordToType.last && state.wordToType.last[0];

        setCharToType(charToType);

        this.setState(state);
      }
      else {
        addTouch(false, last[0]);
      }

      if (dayjs(Date.now()).diff(sessionStart, 'second') > 10) {
        processAddStatistic();
      }
    }
  };

  componentDidMount = () => {
    const {
      props: {
        setCharToType,
      },
    } = this;

    setCharToType(null);
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
      const dataMessage = {
        ending: 'bad',
        text: 'Game over',
      };

      if (result) {
        dataMessage.ending = 'good';
        dataMessage.text = 'You win';
      }

      message = (
        <p styleName={`message message_${dataMessage.ending}`}>
          {dataMessage.text}
          <button
            type="button"
            className="fas fa-redo-alt"
            styleName="refresh"
            onClick={this.restart}
          />
        </p>
      );
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
              : (
                <button
                  type="button"
                  className="button"
                  styleName="start"
                  onClick={this.start}
                >
                  Start
                </button>
              )
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
