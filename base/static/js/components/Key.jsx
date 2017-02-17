import React, {Component} from 'react'

class Key extends Component {
  render() {

    const {
            keyProps,
            type,
            char,
            shiftChar,
            classNameShift
          } = this.props

    if (type === 'number' || type === 'non-alphanumeric') {

      let className = 'keyboard__shift-key';

      if (classNameShift) {
         className = classNameShift;
      }

      return (
        <span {...keyProps}>
          <span className={className}>{shiftChar}</span>
          {char}
        </span>
      )

    }
    else if (type === 'letter') {

      return (
        <span {...keyProps}>
          {char.toUpperCase()}
        </span>
      )

    }
    
    return (
      <span {...keyProps}>
        {char}
      </span>
    )
  }
}


export default Key