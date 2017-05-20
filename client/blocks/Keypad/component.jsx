import React, {PropTypes, Component} from 'react'
import classNames from 'classNames';
import _ from 'lodash';
import Key from '../Key/component.jsx';

class KeyPad extends Component {

   render() {

      const {
              keys,
              pressedKeys,
              pressedWrongKeys,
              idCharsToType
            } = this.props

      let keysNode = keys.map(obj => {
         let isPressed = pressedKeys.indexOf(obj.id) + 1;
         let isWrong = pressedWrongKeys.indexOf(obj.id) + 1;
         let needToType = false;

         _.forEach(idCharsToType, value => {
            if (obj.id === value) {
               needToType = true;
               return false;
            }
         });

         let className = classNames('keypad__key', {
            'keypad__pressed': isPressed,
            'keypad__wrong': isWrong,
            'keypad__to-type': needToType
         });

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
           classNameShift='keypad__shift'
         />

      })

      return (
        <div className='keypad'>
           {keysNode}
        </div>
      )

   }

}

export default KeyPad