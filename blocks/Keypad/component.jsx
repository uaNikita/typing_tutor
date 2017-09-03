import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Key from '../Key/component.jsx';

const KeyPad = props => {
  const {
    keys,
    pressedKeys,
    pressedWrongKeys,
    idCharsToType,
  } = props;

  const keysNode = keys.map(obj => {
    const isPressed = pressedKeys.indexOf(obj.id) + 1;
    const isWrong = pressedWrongKeys.indexOf(obj.id) + 1;
    let needToType = false;

    _.forEach(idCharsToType, value => {
      let result = true;

      if (obj.id === value) {
        needToType = true;
        result = false;
      }

      return result;
    });

    const className = classNames('keypad__key', {
      keypad__pressed: isPressed,
      keypad__wrong: isWrong,
      'keypad__to-type': needToType,
    });

    let finger = obj.finger;

    if (finger === 'index') {
      finger = `${obj.hand}-${finger}`;
    }

    const keyProps = {
      className,
      'data-key': obj.id,
      'data-finger': finger,
    };

    return (
      <Key
        key={obj.id}
        keyProps={keyProps}
        type={obj.type}
        char={obj.key}
        shiftChar={obj.shiftKey}
        classNameShift="keypad__shift"
      />
    );
  });

  return (
    <div className="keypad">
      {keysNode}
    </div>
  );
};

export default KeyPad;
