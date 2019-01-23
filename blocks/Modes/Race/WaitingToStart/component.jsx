import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';

import styles from './waiting-to-start.module.styl';

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
        <p><strong>Available races</strong></p>
        <ul>
          <li styleName="item">First race</li>
          <li styleName="item">
            test test test test test

            <button type="button" className="fas fa-flag-checkered" />
          </li>
        </ul>

        <button
          type="button"
          className="button"
          styleName="button"
          onClick={start}
        >
          Add new race
        </button>
      </Fragment>
    );
  }
}

export default CSSModules(Block, styles);
