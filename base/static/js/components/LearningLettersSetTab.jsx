import React, {Component} from 'react';
import {Link} from 'react-router'
import $ from 'jquery';
import noUiSlider from 'nouislider';
import classNames from 'classNames';

class LearningLettersSetTab extends Component {

  constructor(props) {
    super(props);

    this.charset = this.props.keys.reduce((charset, key) => {
      if (key.type === 'letter') {
        charset.push(key.id)
      }

      return charset
    }, []);
  }

  componentDidMount() {
    let self = this;
    let $noUiValueAlphabet = $('<span class="noUi-value" />');

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

    return (
      <div className="settings-learning__letters-set">
        <div className="settings-learning__item">
          <label htmlFor="" className="settings-learning__label">
            Extend alphabet size:
          </label>
          <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
            <div className="settings-learning__range" ref={(c) => this._alphabetRange = c }></div>
          </div>
        </div>

        <div className="settings-learning__letters">
          {chars}
        </div>
      </div>
    )
  }

}

export default LearningLettersSetTab
