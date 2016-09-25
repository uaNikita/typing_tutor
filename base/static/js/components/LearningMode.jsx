import React, {Component} from 'react';
import {Link} from 'react-router'
import {forEach, find} from 'lodash';
import $ from 'jquery';
import noUiSlider from 'nouislider';
import classNames from 'classNames';
import LearningFree from '../containers/LearningFree.jsx'
import LearningFingers from '../containers/LearningFingers.jsx'

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
      const {mode, lesson} = this.props;
      let tabContent;

      switch (mode) {
         case 'fingers':
            tabContent = <LearningFingers />
            break;
         case 'free':
            tabContent = <LearningFree />
            break;
      }

      let menuItemsData = [
         {
            name: 'By fingers',
            id  : 'fingers'
         }, {
            name: 'Free',
            id  : 'free'
         }
      ];

      let menuItems = menuItemsData.map((item, i) => {
         let linkClass = 'menu__item';

         if (item.id === mode) {
            linkClass = classNames(linkClass, 'menu__item_selected');
         }

         return (
           <div key={i} className='settings-learning__modes-menu-item'>
              <a className={linkClass} onClick={ this._onClickMenu.bind(this, item.id) }>{item.name}</a>
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
                 <h4 className="settings-learning__modes-menu-title">Keys set</h4>
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
