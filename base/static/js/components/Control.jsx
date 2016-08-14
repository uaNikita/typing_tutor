import React, { Component } from 'react';
import classNames from 'classNames';

const getElement = (el, type, value, error, classNameCtrl, onKeyUp, placeholder)=> {
  let cls = 'ctrl';

  if (error) {
    cls = classNames(cls, 'ctrl__error');
  }

  cls = classNames(cls, 'ctrl-full__ctrl', classNameCtrl);

  if (el === 'input') {
    return <input
      className={ cls }
      type={type}
      value={value}
      placeholder={placeholder}
      ref="ctrl"
      onKeyUp={onKeyUp}
    />
  } else if (el === 'textarea') {
    return <textarea
      className={ cls }
      value={value}
      placeholder={placeholder}
      ref="ctrl"
      onKeyUp={onKeyUp}
    />
  }
}

class Control extends Component {

  render() {
    let errorElenemt;

    const { el,
            type,
            value,
            error,
            classNameCtrl,
            className,
            onKeyUp,
            placeholder
            } = this.props

    let element = getElement(el, type, value, error, classNameCtrl, onKeyUp, placeholder);

    if (error) {
      errorElenemt = <p className="error ctrl-full__error">{ error }</p>
    }

    let cls = classNames('ctrl-full', className);

    return (
      <div className={ cls }>
        { element }
        { errorElenemt }
      </div>
    )
  }

}

export default Control

