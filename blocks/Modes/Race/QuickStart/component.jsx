import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import io from 'socket.io-client';

import styles from './fast-race.module.styl';
import { keyboards, languages } from "../../../../constants/languages";
import _ from "lodash";

class Block extends Component {
  socket = io('/races');

  componentDidMount() {
    this.socket.on('disconnect', function () {
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
        data => {
          console.log(data); // data will be 'woot'
        }
      );
  };

  render() {
    const {
      start
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
