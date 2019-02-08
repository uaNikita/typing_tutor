import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import { keyboards } from 'Constants/languages';

import styles from './quick-start.module.styl';

class Block extends Component {
  start = () => {
    const {
      props: {
        keyboard,
        socket,
      },
    } = this;

    const { language } = _.find(keyboards, { name: keyboard });

    socket.emit('quick start', language, (data) => {
      console.log(111, data);
    });
  };

  render() {
    const {
      start,
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
