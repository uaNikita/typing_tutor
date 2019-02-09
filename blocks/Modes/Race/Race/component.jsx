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

    this.socket.emit('get', raceId, ((...args) => {
      console.log('get', args);


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

    this.socket = io('/races')
      .on('error', (error) => {
        if (error === 'Token expired') {
          getNewTokens()
            .then(() => {
              this.socket = io('/races');

              this.getData();
            });
        }
        else {
          this.getData();
        }
      });
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
        {content}
      </div>
    );
  }
}

export default CSSModules(Block, styles);
