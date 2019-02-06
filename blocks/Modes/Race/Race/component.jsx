import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import io from 'socket.io-client';

import Loader from 'Blocks/Loader/component';

import styles from './race.module.styl';

class Block extends Component {
  state = {
    loaded: false,
    typed: null,
    last: null,
    users: [],
  }

  socket = io('/races');

  componentDidMount() {
    const {
      props: {
        history: {
          push,
        },
        match: {
          url,
          params: {
            raceId,
          }
        },
        token,
      },
    } = this;

    this.socket.emit(
      'get',
      {
        raceId,
        token,
      },
      (({ ok, data }) => {
        // if (ok) {
        //   this.setState(data);
        // }
        // else {
        //   push(url);
        // }
      }));

    this.socket.emit('type', raceId);
    this.socket.on('update', (data => {
      console.log(data);
    }));
  }

  render() {
    const {
      state: {
        loaded,
        typed,
        last,
        users,
      },
    } = this;

    let content = <Loader styleName="loader" size={20} />;

    if (loaded) {
      content = (
        <div>
          <span>{typed}</span>
          <span>{last}</span>
          {users.map(({ name, progress }) => (
            <div>
              {name} {progress}
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        test
      </div>
    );
  }
}

export default CSSModules(Block, styles);
