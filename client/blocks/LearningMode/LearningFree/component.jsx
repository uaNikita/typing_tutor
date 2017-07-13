import React, { Component } from 'react';
import classNames from 'classnames';
import { assign } from 'lodash';
import $ from 'jquery';
import noUiSlider from 'nouislider';
import Key from '../../Key/component.jsx';

class LearningFree extends Component {

  componentDidMount() {
    let self = this;

    const { maxLettersInWord } = this.props;

    let $noUiValueMaxLettersInWord = $('<span class="noUi-value" />');

    // max word length range
    noUiSlider.create(this._maxLettersInWordRange, {
      start: [maxLettersInWord],
      step: 1,
      connect: 'lower',
      range: {
        'min': 3,
        'max': 10
      }
    });

    $noUiValueMaxLettersInWord.text(maxLettersInWord);

    $(this._maxLettersInWordRange)
      .find('.noUi-handle')
      .append($noUiValueMaxLettersInWord);

    this._maxLettersInWordRange.noUiSlider.on('slide', function(values, handle) {
      let val = parseInt(values[handle], 10);

      self.props.setMaxLettersInWord(val);

      $noUiValueMaxLettersInWord.text(val);
    });

  }

  render() {
    const { keys, letters } = this.props;

    let keyNodes = keys.map(obj => {
      let className = 'keyboard__key';

      let keyProps = {
        'data-key': obj.id
      };

      if (obj.type === 'letter') {

        if (letters.indexOf(obj.key) + 1) {
          if (letters.length > 1) {
            keyProps.onClick = this._onClickSelectedKey.bind(this, obj.key);
          }

          className = classNames(className, 'keyboard__key_selected');
        } else {
          keyProps.onClick = this._onClickNonSelectedKey.bind(this, obj.key);
        }

      } else {
        className = classNames(className, 'keyboard__key_disabled');
      }

      keyProps.className = className;

      return <Key
        key={obj.id}
        keyProps={keyProps}
        type={obj.type}
        char={obj.key}
        shiftChar={obj.shiftKey}
      />;

    });

    return (
      <div>

        <div className="settings-learning__item">
          <label htmlFor="" className="settings-learning__label">
            Max word length:
          </label>
          <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
            <div className="settings-learning__range settings-learning__max-word-length" ref={(c) => this._maxLettersInWordRange = c }></div>
          </div>
        </div>

        <div className="keyboard">
          {keyNodes}
        </div>

      </div>
    );
  }

  _onClickNonSelectedKey(key) {
    this.props.addLetter(key);
  }

  _onClickSelectedKey(key) {
    this.props.removeLetter(key);
  }
}

export default LearningFree;
