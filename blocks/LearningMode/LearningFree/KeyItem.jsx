import React, { Component } from 'react';
import Key from '../../Key/component.jsx';

class KeyItem extends Component {
  handleClick() {
    this.props.keyProps.onClick(this.props.keyObj.key);
  }

  render() {
    const { keyObj, keyProps } = this.props;

    return (
      <Key
        key={keyObj.id}
        keyProps={keyProps}
        type={keyObj.type}
        char={keyObj.key}
        shiftChar={keyObj.shiftKey}
      />
    );
  }
}

export default KeyItem;
