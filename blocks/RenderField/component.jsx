import React, { Component, Fragment } from 'react';
import classNames from 'classnames';

import SaveLoader from './SaveLoader/component';

import './field.styl';

class RenderField extends Component {
  state = {
    showPassword: false,
  };

  passwordHandleClick = (e) => {
    e.preventDefault();

    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    const {
      props: {
        loader,
        input,
        label,
        type,
        className,
        children,
        meta: {
          submitting,
          submitFailed,
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

    let showError;
    let showHint;

    if (submitFailed) {
      showError = true;
    }
    else if (error && input.value && touched) {
      showHint = true;
    }

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
      type,
      id: `field-${input.name}`,
    };


    let control = <input {...controlProps} />;

    if (type === 'select') {
      control = (
        <select name="industry" className="field__select" {...input} id={controlProps.id}>
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

      control = (
        <Fragment>
          {control}
          <button type="button" className={eyeClassName} onClick={this.passwordHandleClick} />
        </Fragment>
      );
    }
    else if (type === 'textarea') {
      control = <textarea {...controlProps} />;
    }

    let errorText = null;

    if (showHint) {
      errorText = (
        <p className="field__hint">
          {error}
        </p>
      );
    }
    else if (showError) {
      errorText = (
        <p className="field__hint">
          {error}
        </p>
      );
    }

    return (
      <div className={fieldClass}>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label className="field__label" htmlFor={controlProps.id}>
          {label}
          {control}
        </label>
        {loader && <SaveLoader show={submitting} />}
        {errorText}
      </div>
    );
  }
}


export default RenderField;
