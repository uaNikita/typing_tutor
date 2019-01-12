import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

class Block extends Component {
  speedUp = () => {

  };

  render() {
    const {
      props: {
        start,
      },
    } = this;

    return (
      <button
        type="button"
        className="button"
        onClick={start}
      >
        Start
      </button>
    );
  }
}

export default CSSModules(Block);
