import React from 'react';

const Key = (props) => {
  const {
    type,
    char,
    shiftChar,
    classNameShift,
    ...rest
  } = props;

  if (type === 'number' || type === 'non-alphanumeric') {
    let className = 'keyboard__shift-key';

    if (classNameShift) {
      className = classNameShift;
    }

    return (
      <span {...rest}>
        <span className={className}>
          {shiftChar}
        </span>
        {char}
      </span>
    );
  }
  if (type === 'letter') {
    return (
      <span {...rest}>
        {char.toUpperCase()}
      </span>
    );
  }

  return (
    <span {...rest}>
      {char}
    </span>
  );
};

export default Key;
