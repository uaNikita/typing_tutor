import React, { Component } from 'react';
import {
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import _ from 'lodash';

import Loader from 'Blocks/Loader/component';
import Tabs from './Tabs/component';
import Race from './Race/container';
import io from "socket.io-client";

class Block extends Component {
  getData = () => {
    const {
      props: {
        setRace,
        setSocket,
      },
    } = this;

    setSocket(this.socket);

    this.socket.emit('get race', (id => {
      console.log('get', id);

      setRace(id);
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
            .then(() => (
              this.socket = io('/races')
                .on('registered', this.getData)
            ));
        }
      })
      .on('registered', this.getData);
  }

  render() {
    const {
      props: {
        location: {
          pathname,
        },
        match: {
          url,
        },
        activeRace,
      },
    } = this;

    let content = <Loader styleName="loader" size="30" />;

    if (!_.isUndefined(activeRace)) {
      const routes = [
        <Route key="race" path={`${url}/race-:raceId(.{15})`} component={Race} />,
      ];

      if (activeRace) {
        const pathToRace = `${url}/race-${activeRace}`;

        if (pathname === pathToRace) {
          routes.push(<Redirect key="404" to="/404" />);
        }
        else {
          routes.push(<Redirect key="race-redirect" to={pathToRace} />);
        }
      }
      else if (_.isNull(activeRace)) {
        routes.push(<Route key="tabs" path={url} component={Tabs} />);
      }

      content = (
        <Switch>
          {routes}
        </Switch>
      );
    }

    return content;
  }
}

export default Block;
