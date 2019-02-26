import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import Loader from 'Blocks/Loader/component';

import styles from './race.module.styl';

class Block extends Component {
  state = {
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

    socket.emit('get race', raceId, (obj => {
      const state = {
        ...obj,
        last: obj.lastArray.join(' '),
      };

      this.setState(state);
    }));

    socket.on('move', ((users) => (
      this.setState(users)
    )));
  }

  render() {
    const {
      state: {
        typed,
        last,
        users,
      },
      parentRoute,
    } = this;

    let content = <Loader styleName="loader" size="30" />;

    if (_.isNull(users)) {
      content = (
        <div styleName="message">
          <p>We did not find race.</p>
          <p>Go back to <Link to={parentRoute}>races</Link>.</p>
        </div>
      );
    }
    else if (users) {
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
