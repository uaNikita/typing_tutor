import React, {Component} from 'react';
import {Link} from 'react-router'
import $ from 'jquery';
import noUiSlider from 'nouislider';
import classNames from 'classNames';
import {forEach, find} from 'lodash';
import keyboards from '../constants/keyboards';


class LearningMode extends Component {

  constructor(props) {
    super(props);

    let keys = find(keyboards, {'name': props.keyboardName}).keys;

    this.charset = keys.reduce((charset, key) => {

      if (key.type === 'letter') {
        charset.push(key.id)
      }

      return charset

    }, []);

  }

  componentDidMount() {
    let self = this;
    let $noUiValueAlphabet = $('<span class="noUi-value" />');
    let $noUiValueMaxWordLength = $('<span class="noUi-value" />');

    // alphabet range
    noUiSlider.create(this._alphabetRange, {
      start: [9],
      step: 1,
      connect: 'lower',
      range: {
        'min': 1,
        'max': this.charset.length
      }
    });

    $(this._alphabetRange).find('.noUi-handle').append($noUiValueAlphabet);

    this._alphabetRange.noUiSlider.on('slide', function (values, handle) {
      let val = parseInt(values[handle], 10);

      self.props.setAlphabetSize(val);

      $noUiValueAlphabet.text(val);
    });

    // max word length range
    noUiSlider.create(this._maxWordLengthRange, {
      start: [this.props.maxWordLength],
      step: 1,
      connect: 'lower',
      range: {
        'min': 3,
        'max': 10
      }
    });

    $(this._maxWordLengthRange).find('.noUi-handle').append($noUiValueMaxWordLength);

    this._maxWordLengthRange.noUiSlider.on('slide', function (values, handle) {
      let val = parseInt(values[handle], 10);

      self.props.setMaxWordLength(val);

      $noUiValueMaxWordLength.text(val);
    });
  }

  render() {
    let self = this;

    let chars = self.charset.map((letter, i) => {
      let className = 'settings-learning__letter';

      if (i >= self.props.alphabetSize) {
        className = classNames(className, 'settings-learning__letter_excluded');
      }

      return <span key={i} className={className}>{letter}</span>;
    });

    let lessonKeys = this.props.lesson.split('').map((char, idx) => {
      if (char === ' ') {
        char = <span key={idx} className="learningarea__space">␣</span>
      }

      return char;
    });

    return (
      <div className="settings-learning">

        <div className='learningarea'>
          {lessonKeys}
        </div>

        <div className="settings-learning__methods-wrap">

          <div className="settings-learning__methods-menu">
            <a className="menu__item">Test</a>
            <a className="menu__item">Test</a>
          </div>

          <div className="settings-learning__methods-content">
            <div className="settings-learning__letters">
              {chars}
            </div>

            <div className="settings-learning__item">
              <label htmlFor="" className="settings-learning__label">
                Extend alphabet size:
              </label>
              <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
                <div className="settings-learning__range" ref={(c) => this._alphabetRange = c }></div>
              </div>
            </div>
            <div className="settings-learning__item">
              <label htmlFor="" className="settings-learning__label">
                Max word length:
              </label>
              <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
                <div className="settings-learning__range settings-learning__max-word-length" ref={(c) => this._maxWordLengthRange = c }></div>
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }

}

export default LearningMode
