import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import io from 'socket.io-client';
import _ from 'lodash';

import { keyboards } from 'Constants/languages';

import styles from './quick-start.module.styl';

class Block extends Component {
  socket = io('/races');

  componentDidMount() {
    this.socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
  }

  start = () => {
    const {
      props: {
        keyboard,
        accessToken,
      },
    } = this;

    const { language } = _.find(keyboards, { name: keyboard });

    this.socket
      .emit(
        'quick start',
        {
          token: accessToken,
          language,
        },
        (data) => {
          console.log(data); // data will be 'woot'
        },
      );
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
