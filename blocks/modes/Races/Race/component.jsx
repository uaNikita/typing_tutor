import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import Loader from 'Blocks/Loader/component';

import styles from './race.module.styl';

class Block extends Component {
  state = {
    race: undefined,
    typed: null,
    last: null,
    users: [],
  }

  constructor(props) {
    super(props);

    const {
      match: {
        url,
      },
    } = props

    this.parentRoute = url.substring(0, url.lastIndexOf('/'));
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
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

    socket.emit('get race', raceId, (race => {
      let state = {
        race,
      };

      if (race) {
        _.assign(state, {
          race,
        });
      }

      this.setState(state);

      // todo: if race is not exist then show message
      // if (ok) {
      //   this.setState(data);
      // }
      // else {
      //   push(url);
      // }
    }));

    // this.socket.emit('type', raceId);
    // this.socket.on('update', (data => {
    //
    // }));
  }

  render() {
    const {
      state: {
        race,
        typed,
        last,
        users,
      },
      parentRoute,
    } = this;

    let content = <Loader styleName="loader" size="30" />;

    if (_.isNull(race)) {
      content = (
        <div styleName="message">
          <p>We did not find race.</p>
          <p>Go back to <Link to={parentRoute}>races</Link>.</p>
        </div>
      );
    }
    else if (race) {
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
