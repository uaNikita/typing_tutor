import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import Slider from 'rc-slider';

import Key from 'Blocks/Key/component';

class Block extends Component {
  constructor(props) {
    super(props);

    const {
      updateOptions,
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
      onChange: v => updateOptions({ maxLettersInWord: v }),
    };
  }

  getMarks = (min, max) => _(_.range(min, max + 1))
    .map(i => [i, i])
    .fromPairs()
    .value();

  handleChangeSetSize = (setSize) => {
    const {
      props: {
        updateOptions,
      },
    } = this;

    updateOptions({ setSize });
  };

  render() {
    const {
      props: {
        options: {
          setSize,
        },
        keys,
        fingersSet,
        example,
        start,
      },
      maxLettersInWordSliderProps,
    } = this;

    let selectedLetters = _.clone(fingersSet);

    selectedLetters.splice(setSize);

    selectedLetters = _.concat(...selectedLetters);

    const keyNodes = keys.map((obj) => {
      let className = 'keyboard__key';

      if (obj.type === 'letter') {
        if (selectedLetters.indexOf(obj.key) + 1) {
          className = classNames(className, 'keyboard__key_selected');
        }
      }
      else {
        className = classNames(className, 'keyboard__key_disabled');
      }

      let { finger } = obj;

      if (finger === 'index') {
        finger = `${obj.hand}-${finger}`;
      }

      const keyProps = {
        className,
        'data-key': obj.id,
        'data-finger': finger,
      };

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

    const setSizeMin = 1;
    const setSizeMax = fingersSet.length;

    const setSizeSliderProps = {
      min: setSizeMin,
      max: setSizeMax,
      marks: this.getMarks(setSizeMin, setSizeMax),
      step: null,
      defaultValue: setSize,
      onChange: this.handleChangeSetSize,
    };

    return (
      <Fragment>
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

        <div className="syllable__item">
          <p className="syllable__label">Extend fingers set:</p>

          <div className="syllable__item-ctrl syllable__item-ctrl-range">
            <Slider {...setSizeSliderProps} />
          </div>
        </div>

        <div className="keyboard">
          {keyNodes}
        </div>
      </Fragment>
    );
  }
}


export default Block;
