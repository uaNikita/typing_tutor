import React, {Component} from 'react';
import {Link} from 'react-router'
import $ from 'jquery';
import noUiSlider from 'nouislider';
import classNames from 'classNames';
import Key from './Key.jsx';

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
    const {keys} = this.props;

    let chars = this.charset.map((letter, i) => {
      let className = 'settings-learning__letter';

      if (i >= this.props.alphabetSize) {
        className = classNames(className, 'settings-learning__letter_excluded');
      }

      return <span key={i} className={className}>{letter}</span>;
    });

    let keyNodes = keys.map(obj => {

      return <Key
        key={obj.id}
        id={obj.id}
        type={obj.type}
        char={obj.key}
        shiftChar={obj.shiftKey}
        className='keyboard__key'
        classNameShift='keyboard__shift-key'
      />

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
        <div className="keyboard">
          {keyNodes}
        </div>
      </div>
    )
  }

}

export default LearningLettersSetTab
