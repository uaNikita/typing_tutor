import React, {Component} from 'react';
import {Link} from 'react-router'
import {forEach, find} from 'lodash';
import $ from 'jquery';
import noUiSlider from 'nouislider';
import classNames from 'classNames';
import LearningKeyboardTab from '../containers/LearningKeyboardTab.jsx'
import LearningLettersSetTab from '../containers/LearningLettersSetTab.jsx'

class LearningMode extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let self = this;
    let $noUiValueMaxWordLength = $('<span class="noUi-value" />');

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
    const {mode, lesson} = this.props;
    let tabContent;

    switch (mode) {
      case 'letters set':
        tabContent = <LearningLettersSetTab />
        break;
      case 'keyboard':
        tabContent = <LearningKeyboardTab />
        break;
    }

    let menuItems = ['Letters set', 'Keyboard'].map((name, i) => {
      let linkClass = 'menu__item';
      let nameLc = name.toLowerCase();

      if (nameLc === mode) {
        linkClass = classNames(linkClass, 'menu__item_selected');
      }

      return (
        <div key={i} className='settings-learning__menu-item'>
          <a className={linkClass} onClick={ this._onClickMenu.bind(this, nameLc) }>{name}</a>
        </div>
      )
    })

    let lessonKeys = lesson.split('').map((char, idx) => {
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

        <div className="settings-learning__modes">
          <div className="settings-learning__modes-menu">
            {menuItems}
          </div>

          <div className="settings-learning__modes-content">
            <div className="settings-learning__item">
              <label htmlFor="" className="settings-learning__label">
                Max word length:
              </label>
              <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
                <div className="settings-learning__range settings-learning__max-word-length" ref={(c) => this._maxWordLengthRange = c }></div>
              </div>
            </div>

            {tabContent}

          </div>
        </div>

      </div>
    )
  }

  _onClickMenu(selectedMode, e) {
    const {mode, setLearningMode} = this.props;

    e.preventDefault()

    if (selectedMode === mode) {
      return;
    }

    setLearningMode(selectedMode);
  }
}

export default LearningMode
