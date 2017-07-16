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

  const fieldClass = classNames(
    classNames('field', className),
    {
      control_active: active,
      control_error: touched && error,
      control_valid: touched && !active && valid,
      'control_async-validating': asyncValidating,
    },
  );

  let control;

  if (type === 'select') {
    control = (
      <select name="industry" className="control__select" {...input}>
        {children}
      </select>
    );
  }
  else {
    control = <input className="field__text" {...input} placeholder={label} type={type} />;
  }

  return (
    <div className={fieldClass}>
      {touched && error && <p className="error">{error}</p>}
      {control}
    </div>
  );
};

export default RenderField;
