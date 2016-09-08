import React, {Component} from 'react';
import Key from './Key.jsx';

class LearningKeyboardTab extends Component {

  render() {
    const {keys} = this.props;

    let keyNodes = keys.map(obj => {

      return <Key
        key={obj.id}
        id={obj.id}
        type={obj.type}
        char={obj.key}
        shiftChar={obj.shiftKey}
        className='keyboard__key'
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

}

export default LearningKeyboardTab
