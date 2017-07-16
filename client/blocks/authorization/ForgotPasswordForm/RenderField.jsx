import React from 'react';
import classNames from 'classnames';

const RenderField = props => {
  const {
    input,
    label,
    type,
    meta: {
      asyncValidating,
      touched,
      error,
    },
  } = props;

  let rowClass = 'auth__row';

  if (asyncValidating) {
    rowClass = classNames(rowClass, 'async-validating');
  }

  return (
    <div className={rowClass}>
      {touched && error && <p className="error">{error}</p>}
      <input
        className="auth__control"
        {...input}
        type={type}
        placeholder={label}
      />
    </div>
  );
};

export default RenderField;
