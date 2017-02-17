import React, {Component} from 'react';
import {Link} from 'react-router'
import {filter, isArray, concat, clone} from 'lodash';
import $ from 'jquery';
import noUiSlider from 'nouislider';
import classNames from 'classNames';
import Key from './Key.jsx';

class LearningFingers extends Component {

   componentDidMount() {
      let self = this;

      const {fingersSet, setSizeFingers, maxLettersInWord} = this.props;


      let $noUiValueMaxLettersInWord = $('<span class="noUi-value" />');

      // max word length range
      noUiSlider.create(this._maxLettersInWordRange, {
         start  : [maxLettersInWord],
         step   : 1,
         connect: 'lower',
         range  : {
            'min': 3,
            'max': 10
         }
      });

      $noUiValueMaxLettersInWord.text(maxLettersInWord);

      $(this._maxLettersInWordRange)
        .find('.noUi-handle')
        .append($noUiValueMaxLettersInWord);

      this._maxLettersInWordRange.noUiSlider.on('slide', function (values, handle) {
         let val = parseInt(values[handle], 10);

         self.props.setMaxLettersInWord(val);

         $noUiValueMaxLettersInWord.text(val);
      });


      let $noUiValueFingersSet = $('<span class="noUi-value" />');

      noUiSlider.create(this._fingersRange, {
         start  : [setSizeFingers],
         step   : 1,
         connect: 'lower',
         range  : {
            'min': 1,
            'max': fingersSet.length
         }
      });

      $noUiValueFingersSet.text(setSizeFingers);

      $(this._fingersRange)
        .find('.noUi-handle')
        .append($noUiValueFingersSet);

      this._fingersRange.noUiSlider.on('slide', (values, handle) => {
         let val = parseInt(values[handle], 10);
         
         self.props.setFingersSetSize(val);

         $noUiValueFingersSet.text(val);
      });
   }

   render() {

      const {keys, fingersSet, setSizeFingers} = this.props;

      let selectedLetters = clone(fingersSet);

      selectedLetters.splice(setSizeFingers);

      selectedLetters = concat.apply(null, selectedLetters);
      
      let keyNodes = keys.map(obj => {
         let className = 'keyboard__key';

         if (obj.type === 'letter') {
            if (selectedLetters.indexOf(obj.key) + 1) {
               className = classNames(className, 'keyboard__key_selected')
            }
         } else {
            className = classNames(className, 'keyboard__key_disabled')
         }

         let finger = obj.finger;

         if (finger === 'index') {
            finger = obj.hand + '-' + finger;
         }

         let keyProps = {
            className    : className,
            'data-key'   : obj.id,
            'data-finger': finger
         };

         return <Key
           key={obj.id}
           keyProps={keyProps}
           type={obj.type}
           char={obj.key}
           shiftChar={obj.shiftKey}
         />

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

           <div className="settings-learning__item">
              <label htmlFor="" className="settings-learning__label">
                 Extend fingers set:
              </label>
              <div className="settings-learning__item-ctrl settings-learning__item-ctrl-range">
                 <div className="settings-learning__range" ref={(c) => this._fingersRange = c }></div>
              </div>
           </div>

           <div className="keyboard">
              {keyNodes}
           </div>

        </div>
      )
   }

}


export default LearningFingers
