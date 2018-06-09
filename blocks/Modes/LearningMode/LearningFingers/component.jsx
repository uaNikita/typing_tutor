import React, { Component, Fragment } from 'react';
import { concat, clone } from 'lodash';
import noUiSlider from 'nouislider';
import classNames from 'classnames';

import Key from 'Blocks/Key/component.jsx';
import LearningView from 'Blocks/LearningView/component.jsx';
import LearningModeButton from '../LearningModeButton/container';

class LearningFingers extends Component {
  componentDidMount() {
    const {
      props: {
        options: {
          setSize,
          maxLettersInWord,
        },
        fingersSet,
        updateOptions,
      },
    } = this;

    const noUiValueMaxLettersInWord = document.createElement('span');
    noUiValueMaxLettersInWord.className = 'noUi-value';

    // max word length range
    noUiSlider.create(this.maxLettersInWordRange, {
      start: [maxLettersInWord],
      step: 1,
      connect: 'lower',
      range: {
        min: 3,
        max: 10,
      },
    });

    noUiValueMaxLettersInWord.innerHTML = maxLettersInWord;

    this.maxLettersInWordRange
      .querySelector('.noUi-handle')
      .appendChild(noUiValueMaxLettersInWord);

    this.maxLettersInWordRange.noUiSlider.on('slide', (values, handle) => {
      const val = parseInt(values[handle], 10);

      updateOptions({
        maxLettersInWord: val,
      });

      noUiValueMaxLettersInWord.innerHTML = val;
    });

    const noUiValueFingersSet = document.createElement('span');
    noUiValueFingersSet.className = 'noUi-value';

    noUiSlider.create(this.fingersRange, {
      start: [setSize],
      step: 1,
      connect: 'lower',
      range: {
        min: 1,
        max: fingersSet.length,
      },
    });

    noUiValueFingersSet.innerHTML = setSize;

    this.fingersRange
      .querySelector('.noUi-handle')
      .appendChild(noUiValueFingersSet);

    this.fingersRange.noUiSlider.on('slide', (values, handle) => {
      const val = parseInt(values[handle], 10);

      updateOptions({
        setSize: val,
      });

      noUiValueFingersSet.innerHTML = val;
    });
  }

  render() {
    const {
      props: {
        options: {
          setSize,
        },
        keys,
        fingersSet,
        example,
      },
    } = this;

    let selectedLetters = clone(fingersSet);

    selectedLetters.splice(setSize);

    selectedLetters = concat(...selectedLetters);

    const keyNodes = keys.map(obj => {
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

    return (
      <Fragment>
        <h4 className="settings-learning__title">Example</h4>
        <LearningView className="settings-learning__view" lesson={example} />

        <h4 className="settings-learning__title">Settings</h4>

        <LearningModeButton toMode="fingers" />

        <div className="settings-learning__item">
          <label htmlFor="" className="settings-learning__label">
            Max word length:
          </label>
          <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
            <div
              className="settings-learning__range settings-learning__max-word-length"
              ref={c => { this.maxLettersInWordRange = c; }} />
          </div>
        </div>

        <div className="settings-learning__item">
          <label htmlFor="" className="settings-learning__label">
            Extend fingers set:
          </label>
          <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
            <div className="settings-learning__range" ref={c => { this.fingersRange = c; }} />
          </div>
        </div>

        <div className="keyboard">
          {keyNodes}
        </div>

      </Fragment>
    );
  }
}


export default LearningFingers;
