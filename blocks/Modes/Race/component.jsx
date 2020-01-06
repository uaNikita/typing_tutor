import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import io from 'socket.io-client';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import Loader from 'Blocks/Loader/component';
import Tabs from './Tabs/component';
import Race from './Race/container';

import styles from './races.module.styl';

class Block extends Component {
  componentDidMount() {
    const {
      props: {
        socket,
        setRace,
        setSocket,
        getNewTokens,
      },
    } = this;

    if (socket) {
      socket.emit('get active race', id => setRace(id));
    }
    else {
      const getData = () => {
        setSocket(this.socket);

        this.socket.emit('get active race', id => {
          console.log('test', id);

          setRace(id);
        });
      };

      this.socket = io('/races')
        .on('error', error => {
          if (error === 'Token expired') {
            getNewTokens()
              .then(() => {
                this.socket = io('/races')
                  .on('registered', getData);
              });
          }
        })
        .on('registered', getData);
    }
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

    if (_.isUndefined(activeRace)) {
      return <Loader styleName="loader" size="30" />;
    }

    let routes;

    const raceRoute = (
      <Route
        key="race"
        path={`${url}/race-:raceId(.{16})`}
        render={props => <Race {...props} parentUrl={url} />}
      />
    );

    if (activeRace) {
      const pathToRace = `${url}/race-${activeRace}`;

      if (pathname === pathToRace) {
        routes = raceRoute;
      }
      else {
        routes = <Redirect to={pathToRace} />;
      }
    }
    else if (_.isNull(activeRace)) {
      routes = [
        raceRoute,
        <Route key="tabs" path={url} component={Tabs} />,
      ];
    }

    return (
      <Switch>
        {routes}
      </Switch>
    );
  }
}

export default CSSModules(Block, styles);
