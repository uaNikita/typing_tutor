import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

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

      console.log(978, race);

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

  componentDidMount() {
    const {
      props: {
        url,
      },
    } = this;

    this.getData();
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
        <p>
          We did not find race.
          <br />
          <br />
          Go back to <Link to={parentRoute}>races</Link>.
        </p>)
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
