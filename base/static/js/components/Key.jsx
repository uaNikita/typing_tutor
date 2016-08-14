import React, {Component} from 'react'

class Key extends Component {
  render() {

    const {
            id,
            type,
            char,
            shiftChar,
            className,
            classNameShift
          } = this.props

    if (type === 'number' || type === 'non-alphanumeric') {

      return (
        <span className={className} data-key={id}>
          <span className={classNameShift}>{shiftChar}</span>
          {char}
        </span>
      )

    }
    else if (type === 'letter') {

      return (
        <span className={className} data-key={id}>
          {char.toUpperCase()}
        </span>
      )

    }

    return (
      <span className={className} data-key={id}>
        {char}
      </span>
    )
  }
}


export default Key