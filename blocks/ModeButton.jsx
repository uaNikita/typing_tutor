import React from 'react';
import classNames from 'classnames';

const ModeButton = ({ className, toMode, setMode, currentMode }) => {
  let button = {
    props: {
      onClick: () => setMode(toMode),
    },
    text: 'Turn on',
  };

  if (toMode === currentMode) {
    button = {
      props: {
        disabled: true,
      },
      text: 'Turned on',
    };
  }

  return <button className={classNames('button', className)} {...button.props}>{button.text}</button>;
};

export default ModeButton;

