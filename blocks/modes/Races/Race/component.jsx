import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import Loader from 'Blocks/Loader/component';

import styles from './race.module.styl';

class Block extends Component {
  state = {
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
      console.log(obj.status);
    });
  }

  render() {
    const {
      state: {
        typed,
        last,
        users,
        error,
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
    else if (users) {
      content = (
        <div>
          <span>{typed}</span>
          <span>{last}</span>
          {users.map(({ id, progress }) => (
            <p key={id} styleName="user">
              <span className="name">{id}</span>
              <span styleName="progress" style={{ width: `${progress * 100}%` }} />
            </p>
          ))}
        </div>
      );
    }

    return content;
  }
}

export default CSSModules(Block, styles);
