import React, {Component} from 'react';
import classNames from 'classNames';
import keyboards from '../constants/keyboards';
import {find} from 'lodash';
import Key from './Key.jsx';

class Keyboard extends Component {

  render() {

    const {keyboardName} = this.props;

    let keys = find(keyboards, {'name': keyboardName}).keys.map(obj => {

      return <Key
        key={obj.id}
        id={obj.id}
        type={obj.type}
        char={obj.key}
        shiftChar={obj.shiftKey}
        className='keyboard__key'
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
        <div key={i} className='keyboard__menu-item'>
          <a className={linkClass} onClick={ this._onClickNameHandler.bind(this, name) }>{name}</a>
        </div>
      )

    })


    return (
      <div className='keyboard'>

        <menu className='keyboard__types menu'>
          {menuItems}
        </menu>

        <div className='keyboard__item'>
          {keys}
        </div>

      </div>
    )

  }

  _onClickNameHandler(name) {
    this.props.setKeyboard(name);
  }

}

export default Keyboard