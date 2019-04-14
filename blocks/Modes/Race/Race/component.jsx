import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import { closestEl } from 'Utils';

import Loader from 'Blocks/Loader/component';

import Keypad from '../../Keypad/container';

import styles from './race.module.styl';

class Block extends Component {
  constructor(props) {
    super(props);

    const {
      match: {
        url,
      },
    } = props;

    this.parentRoute = url.substring(0, url.lastIndexOf('/'));
  }

  state = {
    status: null,
    error: null,
    typed: null,
    rest: null,
    users: null,
    counter: null,
  };

  componentDidMount() {
    const {
      props: {
        match: {
          params: {
            raceId,
          },
        },
        socket,
      },
    } = this;

    socket
      .emit('get race', raceId, ((res) => {
        if (_.isString(res)) {
          this.setState({
            error: res,
          });
        }
        else {
          const state = {
            ...res,
            last: res.lastArray.join(' '),
          };

          if (res.status === 'ongoing') {
            this.addListeners();
          }

          this.setState(state);

          socket.on('move', this.handleMove);
        }
      }));
  }

  componentWillUnmount = () => {
    const {
      props: {
        socket,
      },
    } = this;

    socket.off('move', this.handleMove);

    this.removeListeners();
  };

  keyDownHandler = (e) => {
    if (!closestEl(e.target, '.drop-down') && e.which === 32) {
      this.typeChar(String.fromCharCode(e.which));
    }
  };

  keyPressHandler = (e) => {
    if (!closestEl(e.target, '.drop-down') && e.which !== 32) {
      this.typeChar(String.fromCharCode(e.which));
    }
  };

  addListeners = () => {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandler);
  };

  removeListeners = () => {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandler);
  };

  handleMove = (obj) => {
    this.setState(obj);

    const startObj = {
      status: 'final countdown',
      counter: 0,
    };

    const endObj = {
      status: 'endend',
    };

    if (_.isEqual(obj, startObj)) {
      this.start();
    }
    else if (_.isEqual(obj, endObj)) {
      this.end();
    }
  };

  typeChar = (code) => {
    const {
      props: {
        typeChar,
      },
      state: {
        typed,
        rest,
      },
    } = this;

    typeChar(String.fromCharCode(code));

    if (this.last[0] === code) {
      this.setState({
        typed: typed + rest[0],
        rest: rest.substring(1),
      });
    }
  }

  handleStart = () => {
    const {
      props: {
        socket,
      },
    } = this;

    socket.emit('start');
  };

  start = () => {
    this.addListeners();
  }

  end = () => {
    this.removeListeners();
  }

  render() {
    const {
      state: {
        typed,
        last,
        users,
        error,
        status,
        counter,
      },
      parentRoute,
    } = this;

    let content = <Loader styleName="loader" size="30" />;

    if (error) {
      content = (
        <div styleName="message">
          <p>{error}.</p>
          <p>Go back to <Link to={parentRoute}>races</Link>.</p>
        </div>
      );
    }
    else if (status) {
      let statusContent;

      console.log('status', status);
      console.log('status', status === 'waiting at least one more racer');

      switch (status) {
        case 'created':
          statusContent = (
            <p styleName="details">
              Waiting for other players…
              {' '}
              <button
                type="button"
                onClick={this.handleStart}
              >
                Start game
              </button>
            </p>
          );
          break;
        case 'waiting at least one more racer':
          statusContent = <p styleName="details">Waiting at least one more player...</p>;
          break;
        case 'waiting for racers':
          console.log(111);
          
          statusContent = <p styleName="details">Time to start: {counter}</p>;
          break;
        case 'final countdown':
          statusContent = <p styleName="countdown">{counter === 0 ? 'Start' : counter}</p>;
          break;
        case 'ongoing':
        default:
      }

      content = (
        <Fragment>
          {statusContent}
          <p styleName="text">
            <span>{typed}</span>
            <span>{last}</span>
          </p>

          <Keypad styleName="keypad" />

          {users.map(({ id, progress }) => (
            <p key={id} styleName="user">
              <span styleName="name">{id}</span>
              <span styleName="progress-bar">
                <span styleName="progress" style={{ width: `${progress * 100}%` }} />
              </span>
            </p>
          ))}
        </Fragment>
      );
    }

    return content;
  }
}

export default CSSModules(Block, styles);