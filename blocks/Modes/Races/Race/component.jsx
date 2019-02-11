import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import io from 'socket.io-client';

import Loader from 'Blocks/Loader/component';

import styles from './race.module.styl';

class Block extends Component {
  state = {
    status: undefined,
    typed: null,
    last: null,
    users: [],
  }

  getData = () => {
    const {
      props: {
        match: {
          params: {
            raceId,
          },
        },
      },
    } = this;

    this.socket.emit('get', raceId, (race => {

      if (race) {

      }
      else {
        this.setState({
          status: null,
        })
      }

      console.log('get', race);

      // todo: if race is not exist then show message
      // if (ok) {
      //   this.setState(data);
      // }
      // else {
      //   push(url);
      // }
    }));

    this.socket.emit('type', raceId);
    this.socket.on('update', (data => {

    }));
  }

  componentDidMount() {
    const {
      props: {
        getNewTokens,
      },
    } = this;

  }

  render() {
    const {
      state: {
        status,
        typed,
        last,
        users,
      },
    } = this;

    let content = <Loader styleName="loader" size="30" />;

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

    return content;
  }
}

export default CSSModules(Block, styles);
