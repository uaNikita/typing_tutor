import React, {Component} from 'react';
import classNames from 'classNames';
import {assign} from 'lodash';
import Key from './Key.jsx';

class LearningFree extends Component {

  render() {
    const {keys, letters} = this.props;

    let keyNodes = keys.map(obj => {
      let className = 'keyboard__key';

      let keyProps = {
        'data-key': obj.id
      };

      if (obj.type === 'letter') {

        if (letters.indexOf(obj.key) + 1) {
          keyProps.onClick = this._onClickSelectedKey.bind(this, obj.key);
          className = classNames(className, 'keyboard__key_selected')
        } else {
          keyProps.onClick = this._onClickNonSelectedKey.bind(this, obj.key);
        }

      } else {
        className = classNames(className, 'keyboard__key_disabled')
      }

      keyProps.className = className;

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
      <div className="settings-learning__keyboard">
        <div className="keyboard">
          {keyNodes}
        </div>
      </div>
    )
  }

  _onClickNonSelectedKey(key) {
    this.props.addLetter(key);
  }

  _onClickSelectedKey(key) {
    this.props.removeLetter(key);
  }
}

export default LearningFree
