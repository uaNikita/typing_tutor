import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import Loader from 'Blocks/Loader/component';
import Keypad from '../../Keypad/container';

import styles from './race.module.styl';
import { closestEl } from "../../../../utils";

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
    last: null,
    users: null,
    counter: null,
  };

  keyDownHandler = (e) => {
    const {
      props: {
        typeChar,
      },
    } = this;

    if (closestEl(e.target, '.drop-down')) {
      return;
    }

    if (e.which === 32) {
      e.preventDefault();

      typeChar(String.fromCharCode(e.which));
    }
  };

  keyPressHandler = (e) => {
    const {
      props: {
        typeChar,
      },
    } = this;

    let result = false;

    if (!closestEl(e.target, '.drop-down') && e.which !== 32) {
      result = typeChar(String.fromCharCode(e.which));
    }

    return result;
  };

  addListeners = () => {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keypress', this.keyPressHandlerModified);
  };

  removeListeners = () => {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keypress', this.keyPressHandlerModified);
  };


  handleMove = (obj) => {
    console.log('move', obj);

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

  startGame = () => {
    const {
      props: {
        socket,
      },
    } = this;

    socket.emit('start');
  };

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

      switch (status) {
        case 'waiting two or more':
          statusContent = (
            <p>
              Waiting for other players…
              {' '}
              <button
                type="button"
                onClick={this.startGame}
              >
                Start game
              </button>
            </p>
          );
          break;
        case 'waiting for participants':
          statusContent = <p>Time to start: {counter}</p>;
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
          <p>
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
