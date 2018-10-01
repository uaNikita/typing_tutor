import React, { Component, Fragment } from 'react';
import classNames from 'classnames';

import SaveLoader from './SaveLoader/component';

import './field.styl';

class RenderField extends Component {
  state = {
    showPassword: false,
  };

  componentDidUpdate() {
    const {
      props: {
        input,
        meta,
        onUpdate,
      },
    } = this;

    if (onUpdate) {
      onUpdate(input, meta);
    }
  }

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
        placeholder,
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
      'field__wrapper',
      {
        field__wrapper_active: active,
        field__wrapper_error: showError,
        field__wrapper_valid: touched && !active && valid,
        field__wrapper_async: asyncValidating,
      },
    );

    const id = `field-${input.name}`;
    let control;

    if (type === 'select') {
      control = (
        <select name="industry" className="field__control field__control_select" {...input} id={id}>
          {children}
        </select>
      );
    }
    else {
      const controlProps = {
        ...input,
        className: 'field__control',
        type,
        id,
        placeholder,
      };

      if (type === 'textarea') {
        controlProps.className = classNames(controlProps.className, 'field__control_textarea');

        control = <textarea {...controlProps} />;
      }
      else {
        controlProps.className = classNames(controlProps.className, 'field__control_input');

        if (type === 'password') {
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
        else {
          control = <input {...controlProps} />;
        }
      }
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
      <Fragment>
        {/* eslint-disable-next-line jsx-a11y/label-has-for */}
        <label className={classNames('field', className)} htmlFor={id}>
          {label && (
            <span className="field__label">
              {label}
            </span>
          )}
          <div className={fieldClass}>
            {control}
            {loader && <SaveLoader show={submitting} />}
            {errorText}
          </div>
        </label>
      </Fragment>
    );
  }
}


export default RenderField;
