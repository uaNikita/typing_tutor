import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import Loader from 'Blocks/Loader/component';

import styles from './race.module.styl';

class Block extends Component {
  state = {
    status: null,
    error: null,
    typed: null,
    last: null,
    users: null,
  };

  constructor(props) {
    super(props);

    const {
      match: {
        url,
      },
    } = props;

    this.parentRoute = url.substring(0, url.lastIndexOf('/'));
  }

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

    socket.emit('get race', raceId, ((res) => {
      console.log('res', res);

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
      }
    }));

    socket.on('move', (obj) => {
      console.log('move');

      this.setState(obj);
    });
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

      switch (status) {
        case 'waiting two or more':
          statusContent = <p>Please start</p>;
          break;
        case 'waiting for participants':
          statusContent = <p>Time to start: {counter}</p>;
          break;
        case 'final countdown':
          statusContent = <p>Final countdown: {counter}</p>;
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
          {users.map(({ id, progress }) => (
            <p key={id} styleName="user">
              <span className="name">{id}</span>
              <span styleName="progress" style={{ width: `${progress * 100}%` }} />
            </p>
          ))}
        </Fragment>
      );
    }

    return content;
  }
}

export default CSSModules(Block, styles);
