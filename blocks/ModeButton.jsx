import React from 'react';

const ModeButton = ({ toMode, setMode, currentMode }) => {
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

  console.log(toMode, currentMode);
  
  return <button className="button" {...button.props}>{button.text}</button>;
};

export default ModeButton;

