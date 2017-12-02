import React, { Component } from 'react';
import classNames from 'classnames';
import noUiSlider from 'nouislider';
import KeyItem from './KeyItem.jsx';

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

  onClickNonSelectedKey(key) {
    this.props.addLetter(key);
  }

  onClickSelectedKey(key) {
    this.props.removeLetter(key);
  }

  render() {
    const { keys, letters } = this.props;

    const keyNodes = keys.map(obj => {
      let className = 'keyboard__key';

      const keyProps = {
        'data-key': obj.id,
      };

      if (obj.type === 'letter') {
        if (letters.indexOf(obj.key) + 1) {
          if (letters.length > 1) {
            keyProps.onClick = this.onClickSelectedKey;
          }

          className = classNames(className, 'keyboard__key_selected');
        }
        else {
          keyProps.onClick = this.onClickNonSelectedKey;
        }
      }
      else {
        className = classNames(className, 'keyboard__key_disabled');
      }

      keyProps.className = className;

      return (
        <KeyItem keyObj={obj} keyProps={keyProps} />
      );
    });

    return (
      <div>

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

      </div>
    );
  }
}

export default LearningFree;
