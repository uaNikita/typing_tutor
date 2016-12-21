import React, {Component} from 'react';
import {Link} from 'react-router'
import {forEach, find} from 'lodash';
import $ from 'jquery';
import noUiSlider from 'nouislider';
import Switcher from './Switcher.jsx';

class LearningMode extends Component {

   constructor(props) {
      super(props);
   }

   componentDidMount() {
      let self = this;
      let $noUiValueMaxWordLength = $('<span class="noUi-value" />');

      // max word length range
      noUiSlider.create(this._maxWordLengthRange, {
         start  : [this.props.maxWordLength],
         step   : 1,
         connect: 'lower',
         range  : {
            'min': 3,
            'max': 10
         }
      });

      $noUiValueMaxWordLength.text(this.props.maxWordLength);

      $(this._maxWordLengthRange).find('.noUi-handle').append($noUiValueMaxWordLength);

      this._maxWordLengthRange.noUiSlider.on('slide', function (values, handle) {
         let val = parseInt(values[handle], 10);

         self.props.setMaxWordLength(val);

         $noUiValueMaxWordLength.text(val);
      });
   }

   render() {
      const {lesson, mode} = this.props;

      let lessonKeys = lesson.split('').map((char, idx) => {
         if (char === ' ') {
            char = <span key={idx} className="learningarea__space">␣</span>
         }

         return char;
      });

      let learningModePath = '/settings/learning-mode/';

      let switcherChecked = false;

      if (mode === 'free') {
         switcherChecked = true;
      }

      console.log('switcherChecked', switcherChecked);
      
      return (
        <div className="settings-learning">

           <div className="settings-learning__mode-switch">
              <Switcher checked={switcherChecked} name="efasdf" value="adsf" onChange={this._onSwitcherChange.bind(this)} />
           </div>

           <div className='learningarea'>
              {lessonKeys}
           </div>

           <div className="settings-learning__modes">
              <div className="settings-learning__modes-menu">
                 <h4 className="settings-learning__modes-menu-title">Keys set</h4>

                 <div className='settings-learning__modes-menu-item'>
                    <Link
                      className="menu__item"
                      activeClassName="menu__item_selected"
                      to={learningModePath + 'fingers'}>
                       By fingers
                    </Link>
                 </div>
                 <div className='settings-learning__modes-menu-item'>
                    <Link
                      className="menu__item"
                      activeClassName="menu__item_selected"
                      to={learningModePath + 'free'}>
                       Free
                    </Link>
                 </div>
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

                 { this.props.children }

              </div>
           </div>

        </div>
      )
   }

   _onSwitcherChange(e) {

      if (e.target.checked) {
         this.props.setLearningMode('free');
      }

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
