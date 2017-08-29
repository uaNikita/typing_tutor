import React from 'react';
import keyboards from '../../constants/keyboards';

import Key from '../Key/component.jsx';
import MenuItem from './MenuItem/container.jsx';

const Keyboard = props => {
  const { keys, name } = props;

  const keyNodes = keys.map(obj => {
    const keyProps = {
      className: 'keyboard__key',
      'data-key': obj.id,
    };

    return (
      <Key
        key={obj.id}
        keyProps={keyProps}
        type={obj.type}
        char={obj.key}
        shiftChar={obj.shiftKey}
      />
    );
  });

  const menuItems = keyboards.map(kb => {
    let selected;

    if (kb.name === name) {
      selected = true;
    }

    return <MenuItem selected={selected} name={kb.name} />;
  });

  return (
    <div className="keyboard-layout">

      <menu className="keyboard-layout__types menu">
        {menuItems}
      </menu>

      <div className="keyboard">
        {keyNodes}
      </div>

    </div>
  );
};

export default Keyboard;
