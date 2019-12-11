import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import { closestEl } from 'Utils';

import Loader from 'Blocks/Loader/component';

import Keypad from '../../Keypad/container';

import styles from './race.module.styl';

class Block extends Component {
  sentText = '';

  debounceSocketEmitType = _.throttle(() => {
    const {
      props: {
        socket,
      },
      state: {
        typed,
      },
    } = this;

    const forServer = typed.slice(this.sentText.length, typed.length);

    this.sentText += forServer;

    socket.emit('type', forServer, error => {
      // eslint-disable-next-line no-console
      console.error('error', error);
    });
  }, 300, { leading: false });

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
        id,
        anonymousToken,
      },
    } = this;

    const userId = id || anonymousToken;

    socket
      .emit('get race', raceId, (res => {
        if (_.isString(res)) {
          this.setState({
            error: res,
          });
        }
        else {
          if (res.status === 'ongoing') {
            const { progress } = _.find(res.users, {
              id: userId,
            });

            if (progress !== 1) {
              this.addListeners();
            }
          }

          this.setState(res);

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

  keyPressHandler = e => {
    if (!closestEl(e.target, '.drop-down')) {
      this.typeChar(e.key);

      // stop scrolling on space
      if (e.key === ' ') {
        e.preventDefault();
      }
    }
  };

  addListeners = () => {
    document.addEventListener('keypress', this.keyPressHandler);
  };

  removeListeners = () => {
    document.removeEventListener('keypress', this.keyPressHandler);
  };

  handleMove = obj => {
    this.setState(obj);

    switch (obj.status) {
      case 'start':
        this.start();
        break;

      case 'endend':
        this.end();
        break;

      default:
    }
  };

  typeChar = char => {
    const {
      props: {
        typeChar,
        setCharToType,
      },
      state: {
        typed,
        rest,
      },
    } = this;

    typeChar(char);

    if (rest[0] === char) {
      this.setState({
        typed: typed + rest[0],
        rest: rest.substring(1),
      });

      let charToType = null;

      if (rest[0]) {
        [charToType] = rest;
      }

      setCharToType(charToType);

      this.debounceSocketEmitType();
    }
  };

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
  };

  end = () => {
    this.removeListeners();
  };

  render() {
    const {
      state: {
        status,
        typed,
        rest,
        users,
        error,
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
          statusContent = <p styleName="details">Time to start: {counter}</p>;
          break;
        case 'final countdown':
          statusContent = <p styleName="countdown">{counter === 0 ? 'Start' : counter}</p>;
          break;
        default:
      }

      content = (
        <>
          <TransitionGroup>
            {statusContent
              ? (
                <CSSTransition
                  key={status}
                  timeout={150}
                  classNames={{
                    enter: styles['animation-enter'],
                    enterActive: styles['animation-enter_active'],
                    exit: styles['animation-exit'],
                    exitActive: styles['animation-exit_active'],
                  }}
                >
                  {statusContent}
                </CSSTransition>
              )
              : null}
          </TransitionGroup>

          <p styleName="text">
            <span styleName="typed">{typed}</span>
            {status === 'ongoing' && <span className="cursor" />}
            <span>{rest}</span>
          </p>

          <Keypad styleName="keypad" />

          {users.map(({ id, progress, transport }) => (
            <p key={id} styleName="user">
              <span styleName="name">{id}</span>
              <span styleName="road">
                <span styleName="track">
                  <span
                    styleName={`transport transport_${transport}`}
                    style={{ left: `${progress * 100}%` }}
                  />
                </span>
              </span>
            </p>
          ))}
        </>
      );
    }

    return content;
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
