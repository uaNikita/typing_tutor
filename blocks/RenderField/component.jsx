import React, { Component } from 'react';
import classNames from 'classnames';

import './field.styl';


class RenderField extends Component {
  state = {
    showPassword: false,
  };

  passwordHandleClick = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  render() {
    const {
      props: {
        input,
        label,
        type,
        className,
        children,
        meta: {
          asyncValidating,
          touched,
          error,
          active,
          valid,
        },
      },
      state: {
        showPassword,
      },
    } = this;

    const showError = touched && !active && error;

    const fieldClass = classNames(
      classNames('field', className),
      {
        field_active: active,
        field_error: showError,
        field_valid: touched && !active && valid,
        'field_async-validating': asyncValidating,
      },
    );

    const controlProps = {
      ...input,
      className: 'field__text',
      placeholder: label,
      type,
    };

    let control = <input {...controlProps} />;

    if (type === 'select') {
      control = (
        <select name="industry" className="field__select" {...input}>
          {children}
        </select>
      );
    }
    else if (type === 'password') {
      let eyeClassName = 'field__eye fa fa-eye';

      if (showPassword) {
        controlProps.type = 'text';

        eyeClassName += '-slash';
      }

      control = [
        <input key="input" {...controlProps} />,
        <button key="eye" className={eyeClassName} onClick={this.passwordHandleClick} />,
      ];
    }

    return (
      <div className={fieldClass}>
        {showError && <p className="error">{error}</p>}
        {control}
      </div>
    );
  }
}


export default RenderField;
