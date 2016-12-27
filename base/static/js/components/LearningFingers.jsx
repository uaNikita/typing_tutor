import React, {Component} from 'react';
import {Link} from 'react-router'
import {filter, isArray, concat, clone} from 'lodash';
import $ from 'jquery';
import noUiSlider from 'nouislider';
import classNames from 'classNames';
import Key from './Key.jsx';

import {getFingersSet} from "../utils";

class LearningFingers extends Component {

   constructor(props) {
      super(props);

      this.fingersLetters = getFingersSet();
   }

   componentDidMount() {
      let self = this;
      this.$noUiValueFingersSet = $('<span class="noUi-value" />');

      let start = this.props.fingersSetSize;

      noUiSlider.create(this._fingersRange, {
         start  : [start],
         step   : 1,
         connect: 'lower',
         range  : {
            'min': 1,
            'max': this.fingersLetters.length
         }
      });

      this.$noUiValueFingersSet.text(start);

      $(this._fingersRange).find('.noUi-handle').append(this.$noUiValueFingersSet);

      this._fingersRange.noUiSlider.on('slide', (values, handle) => {
         let val = parseInt(values[handle], 10);
         
         self.props.setFingersSetSize(val);

         this.$noUiValueFingersSet.text(val);
      });
   }

   componentDidUpdate() {
      this.$noUiValueFingersSet.text(this.props.fingersSetSize);
   }

   render() {
      const {keys, fingersSetSize} = this.props;

      let selectedLetters = clone(this.fingersLetters);

      selectedLetters.splice(fingersSetSize);

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
           classNameShift='keyboard__shift-key'
         />

      });


      return (
        <div className="settings-learning__letters-set">

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
