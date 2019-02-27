import React, { Component, Fragment } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import { keyboards } from 'Constants/languages';

import styles from './quick-start.module.styl';

class Block extends Component {
  start = () => {
    const {
      props: {
        history: {
          push,
        },
        match: {
          url,
        },
        keyboard,
        socket,
        setRace,
      },
    } = this;

    const { language } = _.find(keyboards, { name: keyboard });

    socket.emit('quick start', language, (data) => {
      if (data === 'Already have active race') {
        return;
      }

      setRace(data);

      const raceUrl = `${url.substring(0, url.lastIndexOf('/'))}/race-${data}`;

      push(raceUrl);
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
