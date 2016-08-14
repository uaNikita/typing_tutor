import React, {PropTypes, Component} from 'react'
import classNames from 'classNames';
import {find, forEach} from 'lodash';
import keyboards from '../constants/keyboards';
import Key from '../components/Key.jsx';

class KeyPad extends Component {

  render() {

    const {
            keyboardName,
            pressedRightIds,
            pressedWrongIds,
            idCharsToType
          } = this.props

    let keys = find(keyboards, {'name': keyboardName}).keys.map(obj => {
      let isPressedRight = pressedRightIds.indexOf(obj.id) + 1;
      let isPressedWrong = pressedWrongIds.indexOf(obj.id) + 1;
      let needToType = false;

      forEach(idCharsToType, value => {
        if (obj.id === value) {
          needToType = true;
          return false;
        }
      });

      var className = classNames('keypad__key', 'keypad__' + obj.finger, {
        'keypad__active': isPressedRight || isPressedWrong,
        'keypad__wrong': isPressedWrong,
        'keypad__to-type': needToType
      });

      return <Key
        key={obj.id}
        id={obj.id}
        type={obj.type}
        char={obj.key}
        shiftChar={obj.shiftKey}
        className={className}
        classNameShift='keypad__shift'
      />

    })

    return (
      <div className='keypad'>
        {keys}
      </div>
    )

  }

}

export default KeyPad