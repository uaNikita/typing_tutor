import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import noUiSlider from 'nouislider';

import LearningView from 'Blocks/LearningView/component.jsx';
import Key from 'Blocks/Key/component.jsx';
import LearningModeButton from '../LearningModeButton/container';

class LearningFree extends Component {
  componentDidMount() {
    const self = this;

    const { maxLettersInWord } = this.props;

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

      self.props.setMaxLettersInWord(val);

      noUiValueMaxLettersInWord.innerHTML = val;
    });
  }

  render() {
    const {
      props: {
        keys,
        letters,
        lesson,
        addLetter,
        removeLetter,
      }
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
            keyProps.onClick = () => removeLetter(obj.key);
          }

          className = classNames(className, 'keyboard__key_selected');
        }
        else {
          keyProps.onClick = () => addLetter(obj.key);
        }
      }
      else {
        className = classNames(className, 'keyboard__key_disabled');
      }

      keyProps.className = className;

      return (
        <Key key={obj.id}
          type={obj.type}
          char={obj.key}
          shiftChar={obj.shiftKey}
          {...keyProps} />
      );
    });

    return (
      <Fragment>
        <h4 className="settings-learning__title">Example</h4>
        <LearningView className="settings-learning__view" lesson={lesson} />

        <h4 className="settings-learning__title">Settings</h4>

        <LearningModeButton toMode="free" />

        <div className="settings-learning__item">
          <label htmlFor="" className="settings-learning__label">
            Max word length:
          </label>
          <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
            <div
              className="settings-learning__range settings-learning__max-word-length"
              ref={c => { this.maxLettersInWordRange = c; }}
            />
          </div>
        </div>

        <div className="keyboard">
          {keyNodes}
        </div>

      </Fragment>
    );
  }
}

export default LearningFree;
