import React, {Component} from 'react';
import classNames from 'classNames';
import keyboards from '../constants/keyboards';

import Key from './Key.jsx';

class Keyboard extends Component {

   render() {

      const {keys, name} = this.props;

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
         />

      })

      let menuItems = keyboards.map((kb, i) => {

         let props = {
            key: i,
            className: 'menu__item'
         };

         if (kb.name === name) {

            props.className = classNames(props.className, 'menu__item_selected');

         } else {

            props.onClick = this._onClickNameHandler.bind(this, kb.name);

         }

         return <a {...props}>{kb.name}</a>

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