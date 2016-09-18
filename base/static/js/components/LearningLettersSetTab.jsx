import React, {Component} from 'react';
import {Link} from 'react-router'
import {filter, isArray, concat, clone} from 'lodash';
import $ from 'jquery';
import noUiSlider from 'nouislider';
import classNames from 'classNames';
import Key from './Key.jsx';


class LearningLettersSetTab extends Component {

  constructor(props) {
    super(props);

    var fingers = ['index', 'middle', 'ring', 'pinky'];
    var rows = ['middle', 'top', 'bottom'];
    var hands = ['left', 'right'];

    this.fingersLetters = [];

    rows.forEach(row=> {

      fingers.forEach(finger => {

        hands.forEach(hand => {

          var key = filter(this.props.keys, {
            row: row,
            finger: finger,
            hand: hand,
            type: 'letter'
          });

          key = key.map(obj=> {
            return obj.key;
          })

          if (key) {
            this.fingersLetters.push(key)
          }

        });

      });

    });

  }

  componentDidMount() {
    let self = this;
    let $noUiValueFingersSet = $('<span class="noUi-value" />');

    let start = this.props.fingersSetSize;

    noUiSlider.create(this._fingersRange, {
      start: [start],
      step: 1,
      connect: 'lower',
      range: {
        'min': 1,
        'max': this.fingersLetters.length
      }
    });

    $noUiValueFingersSet.text(start);

    $(this._fingersRange).find('.noUi-handle').append($noUiValueFingersSet);

    this._fingersRange.noUiSlider.on('slide', function (values, handle) {
      let val = parseInt(values[handle], 10);

      self.props.setFingersSetSize(val);

      $noUiValueFingersSet.text(val);
    });
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
        className: className,
        'data-key': obj.id,
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


  _setLetters(letterKeys) {

  };

}


export default LearningLettersSetTab
