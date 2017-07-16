import React from 'react';
import classNames from 'classnames';

const RenderField = props => {
  const {
    input,
    label,
    type,
    className,
    meta: {
      asyncValidating,
      touched,
      error,
      valid,
    },
  } = props;

  let fieldClass = 'field';

  if (asyncValidating) {
    fieldClass = classNames(fieldClass, `${fieldClass}_async-validating`);
  }
  else if (valid) {
    fieldClass = classNames(fieldClass, `${fieldClass}_valid`);
  }

  if (className) {
    fieldClass = classNames(fieldClass, className);
  }

  return (
    <div className={fieldClass}>
      {touched && error && <p className="error">{error}</p>}
      <input className="field__control" {...input} type={type} placeholder={label} />
    </div>
  );
};

export default RenderField;
