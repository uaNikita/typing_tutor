import React from 'react';
import classNames from 'classnames';

import './field.styl';

const RenderField = props => {
  const {
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
  } = props;

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

  let control;

  if (type === 'select') {
    control = (
      <select name="industry" className="field__select" {...input}>
        {children}
      </select>
    );
  }
  else {
    control = <input className="field__text" {...input} placeholder={label} type={type} />;
  }

  return (
    <div className={fieldClass}>
      {showError && <p className="error">{error}</p>}
      {control}
    </div>
  );
};

export default RenderField;
