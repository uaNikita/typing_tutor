import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';

import styles from './fast-race.module.styl';

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
      <Fragment>
        <p styleName="info">Here you can start fast races with random partners or bots</p>

        <button
          type="button"
          className="button"
          onClick={start}
        >
          Start
        </button>
      </Fragment>
    );
  }
}

export default CSSModules(Block, styles);
