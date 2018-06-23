import React from 'react';
import classNames from 'classnames';

import Key from 'Blocks/Key/component.jsx';

const KeyPad = props => {
  const {
    keys,
    pressedKeys,
    pressedWrongKeys,
    idCharsToType,
  } = props;

  const keysNode = keys.map(obj => {
    // todo: pressedWrongKeys and idCharsToType,
    // different names but all vars have array with chars ids
    const className = classNames('keypad__key', {
      keypad__pressed: pressedKeys.indexOf(obj.id) + 1,
      keypad__wrong: pressedWrongKeys.indexOf(obj.id) + 1,
      'keypad__to-type': idCharsToType.indexOf(obj.id) + 1,
    });

    let { finger } = obj;

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
        type={obj.type}
        char={obj.key}
        shiftChar={obj.shiftKey}
        classNameShift="keypad__shift"
        {...keyProps}
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
