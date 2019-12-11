import React, { Component } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Slider from 'rc-slider';

import Key from 'Blocks/Key/component';

class Block extends Component {
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

  handleChangeMaxLettersInWord = maxLettersInWord => {
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
  };

  render() {
    const {
      props: {
        options: {
          letters,
        },
        keys,
        example,
        start,
      },
      maxLettersInWordSliderProps,
    } = this;

    const keyNodes = keys.map(obj => {
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

    const keyboardClassName = classNames(
      'keyboard',
      'syllable__keyboard-free',
      {
        'syllable__keyboard-free_last': letters.length === 1,
      },
    );

    return (
      <>
        <button
          type="button"
          className="button"
          onClick={start}
        >
          Start
        </button>

        <h4 className="syllable__title">Example</h4>

        <p className="syllable__view">{example}</p>

        <h4 className="syllable__title">Settings</h4>

        <div className="syllable__item">
          <p className="syllable__label">Max word length:</p>
          <div className="syllable__item-ctrl syllable__item-ctrl-range">
            <Slider {...maxLettersInWordSliderProps} />
          </div>
        </div>

        <div className={keyboardClassName}>
          {keyNodes}
        </div>
      </>
    );
  }
}

export default Block;
