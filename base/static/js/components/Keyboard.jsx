import React, {Component} from 'react';
import classNames from 'classNames';
import keyboards from '../constants/keyboards';

import Key from './Key.jsx';

class Keyboard extends Component {

  render() {

    const {keys, keyboardName} = this.props;

    let keyNodes = keys.map(obj => {
      let keyProps = {
        className: 'keyboard__key',
        'data-key': obj.id
      };

      return <Key
        key={obj.id}
        keyProps={keyProps}
        type={obj.type}
        char={obj.key}
        shiftChar={obj.shiftKey}
        classNameShift='keyboard__shift-key'
      />

    })

    let menuItems = keyboards.map((keyboard, i) => {
      let name = keyboard.name;
      let linkClass = 'menu__item';

      if (name === keyboardName) {
        linkClass = classNames(linkClass, 'menu__item_selected');
      }

      return (
        <div key={i} className='keyboard-layout__menu-item'>
          <a className={linkClass} onClick={ this._onClickNameHandler.bind(this, name) }>{name}</a>
        </div>
      )

    })


    return (
      <div className='keyboard-layout'>

        <menu className='keyboard-layout__types menu'>
          {menuItems}
        </menu>

        <div className='keyboard'>
          {keyNodes}
        </div>

      </div>
    )

  }

  _onClickNameHandler(name) {
    this.props.setKeyboard(name);
  }

}

export default Keyboard