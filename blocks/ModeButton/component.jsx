import React from 'react';

const Component = ({ to, setMode, mode }) => {
  let button = {
    props: {
      onClick: () => setMode(to),
    },
    text: 'Turn on',
  };

  if (to === mode) {
    button = {
      props: {
        disabled: true,
      },
      text: 'Turned on',
    };
  }

  return (
    <button type="button" className="button" {...button.props}>
      {button.text}
    </button>
  );
};

export default Component;
