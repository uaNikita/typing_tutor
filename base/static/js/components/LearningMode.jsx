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

      if ( key.type === 'letter' ) {
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
      console.log('update');

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
      let className = 'letter';

      if (i >= self.props.alphabetSize) {
        className = classNames(className, 'letter__excluded');
      }

      return <span key={i} className={className}>{letter}</span>;
    });

    return (
      <div className="mode__tab-content">
        <div className="mode__item">
          <label htmlFor="" className="mode__label">
            Lesson's key set
          </label>
          <div className="mode__item-ctrl">
            {chars}
          </div>
        </div>

        <div className="mode__item">
          <label htmlFor="" className="mode__label">
            Extend alphabet size:
          </label>
          <div className="mode__item-ctrl mode__item-ctrl-range">
            <div className="mode__range" ref={(c) => this._alphabetRange = c }></div>
          </div>
        </div>
        <div className="mode__item">
          <label htmlFor="" className="mode__label">
            Max word length:
          </label>
          <div className="mode__item-ctrl mode__item-ctrl-range">
            <div className="mode__range mode__max-word-length" ref={(c) => this._maxWordLengthRange = c }></div>
          </div>
        </div>
        <div className="mode__item">
          <label htmlFor="" className="mode__label">
            Generated lesson example:
          </label>
          <div className="mode__item-ctrl mode__item-generated-lesson">
            <div className="mode__generated-lesson">
              {this.props.lesson}
            </div>
          </div>
        </div>

      </div>

    )
  }

}

export default LearningMode
