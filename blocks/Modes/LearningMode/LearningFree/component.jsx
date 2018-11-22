import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Slider from 'rc-slider';

import Key from 'Blocks/Key/component';
import LearningModeButton from '../LearningModeButton/container';

class LearningFree extends Component {
  constructor(props) {
    super(props);

    const {
      options: {
        maxLettersInWord,
      },
    } = props;

    const maxLettersInWordMin = 3;
    const maxLettersInWordMax = 10;

    this.maxLettersInWordSliderProps = {
      min: maxLettersInWordMin,
      max: maxLettersInWordMax,
      marks: this.getMarks(maxLettersInWordMin, maxLettersInWordMax),
      step: null,
      defaultValue: maxLettersInWord,
      onChange: this.handleChangeMaxLettersInWord,
    };
  }

  getMarks = (min, max) => _(_.range(min, max + 1))
    .map(i => [i, i])
    .fromPairs()
    .value();

  handleChangeMaxLettersInWord = (maxLettersInWord) => {
    const {
      props: {
        updateOptions,
      },
    } = this;

    updateOptions({ maxLettersInWord });
  };

  updateKey = (action, key) => {
    const {
      props: {
        updateOptions,
      },
    } = this;

    updateOptions({
      letters: [action, key],
    });
  }

  render() {
    const {
      props: {
        options: {
          letters,
        },
        keys,
        example,
      },
      maxLettersInWordSliderProps,
    } = this;

    const keyNodes = keys.map((obj) => {
      let className = 'keyboard__key';

      const keyProps = {
        'data-key': obj.id,
        'data-finger': obj.finger === 'index' ? `${obj.hand}-${obj.finger}` : obj.finger,
      };

      if (obj.type === 'letter') {
        if (letters.indexOf(obj.key) + 1) {
          if (letters.length > 1) {
            keyProps.onClick = this.updateKey.bind(this, 'remove', obj.key);
          }

          className = classNames(className, 'keyboard__key_selected');
        }
        else {
          keyProps.onClick = this.updateKey.bind(this, 'add', obj.key);
        }
      }
      else {
        className = classNames(className, 'keyboard__key_disabled');
      }

      keyProps.className = className;

      return (
        <Key
          key={obj.id}
          type={obj.type}
          char={obj.key}
          shiftChar={obj.shiftKey}
          {...keyProps}
        />
      );
    });

    const keyboardClassName = classNames('keyboard', 'options-learning__keyboard-free', {
      'options-learning__keyboard-free_last': letters.length === 1,
    });

    return (
      <Fragment>
        <h4 className="options-learning__title">
          Example
        </h4>

        <p className="options-learning__view">{example}</p>

        <h4 className="options-learning__title">
          Settings
        </h4>

        <LearningModeButton toMode="free" />

        <div className="options-learning__item">
          <p className="options-learning__label">
            Max word length:
          </p>
          <div className="options-learning__item-ctrl options-learning__item-ctrl-range">
            <Slider {...maxLettersInWordSliderProps} />
          </div>
        </div>

        <div className={keyboardClassName}>
          {keyNodes}
        </div>
      </Fragment>
    );
  }
}

export default LearningFree;
