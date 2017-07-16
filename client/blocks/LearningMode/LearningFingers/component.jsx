import React, { Component } from 'react';
import { concat, clone } from 'lodash';
import $ from 'jquery';
import noUiSlider from 'nouislider';
import classNames from 'classnames';
import Key from '../../Key/component.jsx';

class LearningFingers extends Component {
  componentDidMount() {
    const self = this;

    const { fingersSet, setSizeFingers, maxLettersInWord } = this.props;

    const $noUiValueMaxLettersInWord = $('<span class="noUi-value" />');

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

    $noUiValueMaxLettersInWord.text(maxLettersInWord);

    $(this.maxLettersInWordRange)
      .find('.noUi-handle')
      .append($noUiValueMaxLettersInWord);

    this.maxLettersInWordRange.noUiSlider.on('slide', (values, handle) => {
      const val = parseInt(values[handle], 10);

      self.props.setMaxLettersInWord(val);

      $noUiValueMaxLettersInWord.text(val);
    });


    const $noUiValueFingersSet = $('<span class="noUi-value" />');

    noUiSlider.create(this.fingersRange, {
      start: [setSizeFingers],
      step: 1,
      connect: 'lower',
      range: {
        min: 1,
        max: fingersSet.length,
      },
    });

    $noUiValueFingersSet.text(setSizeFingers);

    $(this.fingersRange)
      .find('.noUi-handle')
      .append($noUiValueFingersSet);

    this.fingersRange.noUiSlider.on('slide', (values, handle) => {
      const val = parseInt(values[handle], 10);

      self.props.setFingersSetSize(val);

      $noUiValueFingersSet.text(val);
    });
  }

  render() {
    const { keys, fingersSet, setSizeFingers } = this.props;

    let selectedLetters = clone(fingersSet);

    selectedLetters.splice(setSizeFingers);

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

      let finger = obj.finger;

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
          keyProps={keyProps}
          type={obj.type}
          char={obj.key}
          shiftChar={obj.shiftKey}
        />
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

      </div>
    );
  }
}


export default LearningFingers;